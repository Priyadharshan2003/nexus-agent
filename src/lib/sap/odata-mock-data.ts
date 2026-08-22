import { ODataEntity } from "../types";

export const MOCK_ODATA_ENTITIES: ODataEntity[] = [
  {
    name: "A_SalesOrder",
    description: "S/4HANA Sales Order Header and Item Entities (OData V4)",
    serviceUri: "/sap/opu/odata4/sap/api_sales_order/srvd_a2x/sap/salesorder/0001",
    entitySet: "SalesOrder",
    version: "V4",
    keyFields: ["SalesOrder"],
    fields: [
      { name: "SalesOrder", type: "Edm.String", nullable: false, label: "Sales Order Number" },
      { name: "SalesOrganization", type: "Edm.String", nullable: false, label: "Sales Org" },
      { name: "DistributionChannel", type: "Edm.String", nullable: false, label: "Dist. Channel" },
      { name: "SoldToParty", type: "Edm.String", nullable: false, label: "Sold-To Customer" },
      { name: "TotalNetAmount", type: "Edm.Decimal", nullable: false, label: "Total Net Value" },
      { name: "TransactionCurrency", type: "Edm.String", nullable: false, label: "Currency" },
      { name: "OverallDeliveryStatus", type: "Edm.String", nullable: true, label: "Delivery Status" },
      { name: "CreationDate", type: "Edm.Date", nullable: false, label: "Created On" }
    ],
    sampleRecords: [
      {
        SalesOrder: "90001042",
        SalesOrganization: "1010",
        DistributionChannel: "10",
        SoldToParty: "USCU_00192 (AeroTech Corp)",
        TotalNetAmount: 148500.00,
        TransactionCurrency: "EUR",
        OverallDeliveryStatus: "A (Not Delivered)",
        CreationDate: "2026-03-12"
      },
      {
        SalesOrder: "90001043",
        SalesOrganization: "1710",
        DistributionChannel: "20",
        SoldToParty: "DECU_00411 (Bavaria Dynamics GmbH)",
        TotalNetAmount: 89400.50,
        TransactionCurrency: "EUR",
        OverallDeliveryStatus: "C (Completely Processed)",
        CreationDate: "2026-03-14"
      },
      {
        SalesOrder: "90001044",
        SalesOrganization: "1010",
        DistributionChannel: "10",
        SoldToParty: "USCU_00832 (Apex Global Logistics)",
        TotalNetAmount: 420350.00,
        TransactionCurrency: "USD",
        OverallDeliveryStatus: "B (Partially Delivered)",
        CreationDate: "2026-03-18"
      }
    ]
  },
  {
    name: "A_BusinessPartner",
    description: "SAP S/4HANA Master Business Partner API (OData V2/V4)",
    serviceUri: "/sap/opu/odata/sap/API_BUSINESS_PARTNER",
    entitySet: "A_BusinessPartner",
    version: "V2",
    keyFields: ["BusinessPartner"],
    fields: [
      { name: "BusinessPartner", type: "Edm.String", nullable: false, label: "Partner ID" },
      { name: "BusinessPartnerFullName", type: "Edm.String", nullable: false, label: "Full Name / Organization" },
      { name: "BusinessPartnerCategory", type: "Edm.String", nullable: false, label: "Category (1=Person, 2=Org)" },
      { name: "Customer", type: "Edm.String", nullable: true, label: "Associated Customer ID" },
      { name: "Supplier", type: "Edm.String", nullable: true, label: "Associated Vendor ID" },
      { name: "Country", type: "Edm.String", nullable: false, label: "Country Key" },
      { name: "CityName", type: "Edm.String", nullable: true, label: "City" }
    ],
    sampleRecords: [
      {
        BusinessPartner: "10000492",
        BusinessPartnerFullName: "SAP SE Headquarters Global",
        BusinessPartnerCategory: "2",
        Customer: "CUST_9910",
        Supplier: "VEND_4401",
        Country: "DE",
        CityName: "Walldorf"
      },
      {
        BusinessPartner: "10000493",
        BusinessPartnerFullName: "CloudScale Systems Inc.",
        BusinessPartnerCategory: "2",
        Customer: "CUST_9911",
        Supplier: null,
        Country: "US",
        CityName: "San Francisco"
      },
      {
        BusinessPartner: "10000494",
        BusinessPartnerFullName: "Kyoto Semiconductor KK",
        BusinessPartnerCategory: "2",
        Customer: "CUST_8820",
        Supplier: "VEND_1102",
        Country: "JP",
        CityName: "Kyoto"
      }
    ]
  },
  {
    name: "A_PurchaseRequisition",
    description: "S/4HANA Materials Management Purchase Requisition Header & Items",
    serviceUri: "/sap/opu/odata4/sap/api_purchaserequisition/srvd_a2x/sap/purchaserequisition/0001",
    entitySet: "PurchaseRequisition",
    version: "V4",
    keyFields: ["PurchaseRequisition", "PurchaseRequisitionItem"],
    fields: [
      { name: "PurchaseRequisition", type: "Edm.String", nullable: false, label: "PR Number" },
      { name: "PurchaseRequisitionItem", type: "Edm.String", nullable: false, label: "Item No" },
      { name: "PurReqnDescription", type: "Edm.String", nullable: false, label: "Short Text" },
      { name: "Material", type: "Edm.String", nullable: true, label: "Material Code" },
      { name: "RequestedQuantity", type: "Edm.Decimal", nullable: false, label: "Quantity" },
      { name: "BaseUnit", type: "Edm.String", nullable: false, label: "Unit of Measure" },
      { name: "TotalNetAmount", type: "Edm.Decimal", nullable: false, label: "Item Net Value" },
      { name: "PurReqnReleaseStatus", type: "Edm.String", nullable: false, label: "Release Status" }
    ],
    sampleRecords: [
      {
        PurchaseRequisition: "10049101",
        PurchaseRequisitionItem: "00010",
        PurReqnDescription: "High-Density Server Blade Arrays",
        Material: "MAT_HW_0991",
        RequestedQuantity: 24.0,
        BaseUnit: "EA",
        TotalNetAmount: 118800.0,
        PurReqnReleaseStatus: "02 (Approved)"
      },
      {
        PurchaseRequisition: "10049102",
        PurchaseRequisitionItem: "00010",
        PurReqnDescription: "SAP BTP Kyma Enterprise Cluster Expansion",
        Material: "SRV_CLOUD_01",
        RequestedQuantity: 1.0,
        BaseUnit: "AU",
        TotalNetAmount: 45000.0,
        PurReqnReleaseStatus: "01 (Pending Approval)"
      }
    ]
  }
];
