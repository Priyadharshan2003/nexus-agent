import { AbapAnalysisResult } from "../types";

export const SAMPLE_ABAP_PROJECTS: AbapAnalysisResult[] = [
  {
    programName: "Z_ECC_CUSTOM_SO_POSTING",
    programType: "Report",
    linesOfCode: 184,
    cyclomaticComplexity: 28,
    cleanCoreReadinessScore: 32,
    securityVulnerabilities: [
      {
        ruleId: "SEC_AUTH_01",
        severity: "High",
        line: 42,
        description: "Direct DB update performed on standard table VBAK without AUTHORITY-CHECK (S_DEVELOP or V_VBAK_VKO)",
        remediation: "Replace direct SQL with EML (Entity Manipulation Language) via I_SalesOrderTP business object in RAP."
      },
      {
        ruleId: "SEC_INJ_04",
        severity: "Medium",
        line: 88,
        description: "Dynamic SQL clause built from concatenated unvalidated user input",
        remediation: "Use typed parameter binding or ABAP SQL host variables :param."
      }
    ],
    deprecatedStatements: [
      {
        line: 18,
        statement: "TABLES: vbak, vbap.",
        modernAlternative: "Declare explicit typed structures or use CDS Views."
      },
      {
        line: 55,
        statement: "CALL FUNCTION 'BAPI_SALESORDER_CREATEFROMDAT2'",
        modernAlternative: "MODIFY ENTITIES OF I_SalesOrderTP ENTITY SalesOrder CREATE AUTO FILL CID WITH ..."
      },
      {
        line: 112,
        statement: "SELECT * FROM kna1 WHERE ...",
        modernAlternative: "SELECT FROM I_Customer WITH PRIVILEGED ACCESS or standard CDS View."
      }
    ],
    legacyCode: `*&---------------------------------------------------------------------*
*& Report Z_ECC_CUSTOM_SO_POSTING (Legacy ABAP 7.4 / ECC 6.0)
*& Author: Legacy Migration Export
*& WARNING: Contains Direct DB Writes & Obsolete Function Modules
*&---------------------------------------------------------------------*
REPORT z_ecc_custom_so_posting.

TABLES: vbak, vbap, kna1.

DATA: gt_order_header TYPE STANDARD TABLE OF bapisdhd1,
      gs_order_header TYPE bapisdhd1,
      gt_order_items  TYPE STANDARD TABLE OF bapisditm,
      gs_order_item   TYPE bapisditm,
      gt_return       TYPE STANDARD TABLE OF bapiret2,
      gv_vbeln        TYPE vbeln_va.

PARAMETERS: p_kunnr TYPE kna1-kunnr OBLIGATORY,
            p_vkorg TYPE vbak-vkorg DEFAULT '1000',
            p_vtweg TYPE vbak-vtweg DEFAULT '10',
            p_matnr TYPE vbap-matnr OBLIGATORY,
            p_kwmeng TYPE vbap-kwmeng DEFAULT 10.

START-OF-SELECTION.
  " Direct select without Clean Core CDS
  SELECT SINGLE name1 ort01 FROM kna1 INTO (@DATA(lv_name), @DATA(lv_city))
    WHERE kunnr = @p_kunnr.

  IF sy-subrc <> 0.
    WRITE: / 'Customer not found:', p_kunnr.
    EXIT.
  ENDIF.

  " Prepare legacy BAPI structures
  gs_order_header-doc_type   = 'TA'.
  gs_order_header-sales_org  = p_vkorg.
  gs_order_header-distr_chan = p_vtweg.
  gs_order_header-division   = '00'.
  gs_order_header-purch_no_c = 'MIGRATION-TEST-01'.

  gs_order_item-itm_number = '000010'.
  gs_order_item-material   = p_matnr.
  gs_order_item-target_qty = p_kwmeng.
  APPEND gs_order_item TO gt_order_items.

  " Legacy BAPI Call without Cloud Enablement
  CALL FUNCTION 'BAPI_SALESORDER_CREATEFROMDAT2'
    EXPORTING
      order_header_in = gs_order_header
    IMPORTING
      salesdocument   = gv_vbeln
    TABLES
      return          = gt_return
      order_items_in  = gt_order_items.

  " Non-compliant direct DB manipulation
  UPDATE vbak SET bname = sy-uname WHERE vbeln = gv_vbeln.
  COMMIT WORK AND WAIT.

  WRITE: / 'Sales Order Created successfully:', gv_vbeln.`,
    modernizedAbapCloud: `*&---------------------------------------------------------------------*
*& Class ZCL_SALES_ORDER_RAP_HANDLER (ABAP Cloud / Clean Core Ready)
*& Architecture: ABAP RESTful Application Programming Model (RAP)
*& Framework: Released SAP S/4HANA Cloud C1 APIs & EML
*&---------------------------------------------------------------------*
CLASS zcl_sales_order_rap_handler DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.

    TYPES: BEGIN OF ty_create_input,
             customer_id TYPE kunnr,
             sales_org   TYPE vkorg,
             dist_chan   TYPE vtweg,
             material    TYPE matnr,
             quantity    TYPE kwmeng,
           END OF ty_create_input.

    CLASS-METHODS create_sales_order
      IMPORTING
        is_input        TYPE ty_create_input
      RETURNING
        VALUE(rv_vbeln) TYPE vbeln_va
      RAISING
        cx_rap_business_exception.

  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_sales_order_rap_handler IMPLEMENTATION.

  METHOD create_sales_order.
    " 1. Strict Authority Check against S_TABU_DIS / V_VBAK_VKO
    AUTHORITY-CHECK OBJECT 'V_VBAK_VKO'
      ID 'VKORG' FIELD is_input-sales_org
      ID 'VTWEG' FIELD is_input-dist_chan
      ID 'ACTVT' FIELD '01'.
    IF sy-subrc <> 0.
      RAISE EXCEPTION NEW cx_rap_business_exception( text = 'Not authorized to create Sales Order' ).
    ENDIF.

    " 2. Clean Core Entity Manipulation Language (EML)
    MODIFY ENTITIES OF I_SalesOrderTP
      ENTITY SalesOrder
      CREATE
        SET FIELDS WITH VALUE #( (
          %cid                    = 'CID_SO_NEW_001'
          SalesOrderType          = 'OR'
          SalesOrganization       = is_input-sales_org
          DistributionChannel     = is_input-dist_chan
          OrganizationDivision    = '00'
          SoldToParty             = is_input-customer_id
          PurchaseOrderByCustomer = 'NEXUS-AUTONOMOUS-AI'
        ) )
      CREATE BY \\_Item
        FIELDS ( Material RequestedQuantity )
        WITH VALUE #( (
          %cid_ref = 'CID_SO_NEW_001'
          %target  = VALUE #( (
            %cid              = 'CID_SO_ITEM_10'
            Material          = is_input-material
            RequestedQuantity = is_input-quantity
          ) )
        ) )
      MAPPED   DATA(ls_mapped)
      FAILED   DATA(ls_failed)
      REPORTED DATA(ls_reported).

    IF ls_failed IS NOT INITIAL.
      RAISE EXCEPTION NEW cx_rap_business_exception( text = 'Failed to instantiate Sales Order via RAP' ).
    ENDIF.

    COMMIT ENTITIES.
    rv_vbeln = ls_mapped-salesorder[ 1 ]-SalesOrder.
  ENDMETHOD.

  METHOD if_oo_adt_classrun~main.
    TRY.
        DATA(lv_order) = create_sales_order( VALUE #(
          customer_id = '0010000492'
          sales_org   = '1010'
          dist_chan   = '10'
          material    = 'MAT_HW_0991'
          quantity    = 25
        ) ).
        out->write( |Sales Order Created via EML Clean Core: { lv_order }| ).
      CATCH cx_root INTO DATA(lx_err).
        out->write( lx_err->get_text( ) ).
    ENDTRY.
  ENDMETHOD.

ENDCLASS.`,
    modernizedRapBehavior: `managed implementation in class zbp_i_salesorder unique;
strict ( 2 );

define behavior for ZI_CustomSalesOrder alias SalesOrder
persistent table zcustom_so_root
lock master
authorization master ( instance )
etag master LocalLastChangedAt
{
  create;
  update;
  delete;
  association _Items { create; }

  action ( features : instance ) releaseForDelivery result [1] $self;
  validation validateCustomer on save { field SoldToParty; }
}`
  },
  {
    programName: "Z_LEAVE_MGMT_CUSTOM_REPORT",
    programType: "Report",
    linesOfCode: 240,
    cyclomaticComplexity: 34,
    cleanCoreReadinessScore: 24,
    securityVulnerabilities: [
      {
        ruleId: "SEC_AUTH_02",
        severity: "High",
        line: 29,
        description: "PA2001 (Absence record) updated directly without HR infotype security check P_ORGIN",
        remediation: "Transition to SAP SuccessFactors Time Off API or BTP CAP Employee Leave Service."
      }
    ],
    deprecatedStatements: [
      {
        line: 14,
        statement: "TABLES: pa0001, pa2001.",
        modernAlternative: "Consume CDS View I_PersonWorkAgreement or SuccessFactors API."
      }
    ],
    legacyCode: `*&---------------------------------------------------------------------*
*& Report Z_LEAVE_MGMT_CUSTOM_REPORT
*& Direct modification of SAP HR Infotypes (PA0001 / PA2001)
*&---------------------------------------------------------------------*
REPORT z_leave_mgmt_custom_report.
TABLES: pa0001, pa2001.

PARAMETERS: p_pernr TYPE pa0001-pernr OBLIGATORY,
            p_subty TYPE pa2001-subty DEFAULT '0100',
            p_begda TYPE pa2001-begda,
            p_endda TYPE pa2001-endda.

START-OF-SELECTION.
  SELECT SINGLE * FROM pa0001 WHERE pernr = p_pernr AND endda >= sy-datum.
  IF sy-subrc = 0.
    " Unsafe direct table insert into PA2001
    pa2001-pernr = p_pernr.
    pa2001-subty = p_subty.
    pa2001-begda = p_begda.
    pa2001-endda = p_endda.
    INSERT pa2001.
    WRITE: / 'Leave created for employee:', pa0001-ename.
  ENDIF.`,
    modernizedAbapCloud: `*&---------------------------------------------------------------------*
*& Transformed to SAP BTP Side-by-Side CAP Service with Clean Core
*& Target: Employee Leave Request Service on SAP HANA Cloud
*&---------------------------------------------------------------------*
CLASS zcl_leave_request_client DEFINITION
  PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
    CLASS-METHODS submit_leave_request
      IMPORTING iv_pernr TYPE string
                iv_days  TYPE i.
ENDCLASS.

CLASS zcl_leave_request_client IMPLEMENTATION.
  METHOD submit_leave_request.
    " Invokes BTP Side-by-Side CAP microservice via Outbound HTTP Destination
    DATA(lo_dest) = cl_http_destination_provider=>create_by_cloud_destination( 'BTP_CAP_LEAVE_API' ).
    " ... Clean Core API call with zero on-premise table locking
  ENDMETHOD.
  METHOD if_oo_adt_classrun~main.
    submit_leave_request( iv_pernr = 'E9021' iv_days = 3 ).
  ENDMETHOD.
ENDCLASS.`
  }
];
