import { CapProjectGeneration } from "../types";

export const CAP_STARTER_PROJECTS: Record<string, CapProjectGeneration> = {
  leave_management: {
    projectName: "employee-leave-service",
    namespace: "sap.btp.leavemgmt",
    description: "SAP BTP CAP microservice for Enterprise Employee Leave Requests with multi-level approval workflows and HANA Cloud persistence.",
    database: "SAP HANA Cloud",
    entities: [
      {
        name: "LeaveRequests",
        annotations: ["@UI.LineItem", "@UI.HeaderInfo", "@restrict: [{ grant: ['READ', 'WRITE'], to: 'Employee' }]"],
        elements: [
          { name: "ID", type: "UUID", key: true },
          { name: "employeeId", type: "String(32)", required: true },
          { name: "employeeName", type: "String(128)", required: true },
          { name: "leaveType", type: "String(20)", required: true },
          { name: "startDate", type: "Date", required: true },
          { name: "endDate", type: "Date", required: true },
          { name: "totalDays", type: "Integer", required: true },
          { name: "reason", type: "String(500)" },
          { name: "status", type: "String(20)", required: true }
        ]
      },
      {
        name: "ApprovalLogs",
        annotations: ["@readonly"],
        elements: [
          { name: "ID", type: "UUID", key: true },
          { name: "request_ID", type: "UUID" },
          { name: "approverEmail", type: "String(128)" },
          { name: "action", type: "String(20)" },
          { name: "comment", type: "String(255)" },
          { name: "timestamp", type: "Timestamp" }
        ]
      }
    ],
    files: [
      {
        path: "db/schema.cds",
        language: "cds",
        content: `namespace sap.btp.leavemgmt;

using { cuid, managed } from '@sap/cds/common';

type LeaveStatus : String enum {
    PENDING   = 'PENDING';
    APPROVED  = 'APPROVED';
    REJECTED  = 'REJECTED';
    CANCELLED = 'CANCELLED';
}

entity LeaveRequests : cuid, managed {
    employeeId   : String(32) not null;
    employeeName : String(128) not null;
    leaveType    : String(20) not null;
    startDate    : Date not null;
    endDate      : Date not null;
    totalDays    : Integer not null;
    reason       : String(500);
    status       : LeaveStatus default 'PENDING';
    approvals    : Composition of many ApprovalLogs on approvals.request = $self;
}

entity ApprovalLogs : cuid, managed {
    request       : Association to LeaveRequests;
    approverEmail : String(128);
    action        : LeaveStatus;
    comment       : String(255);
}`
      },
      {
        path: "srv/leave-service.cds",
        language: "cds",
        content: `using { sap.btp.leavemgmt as db } from '../db/schema';

@path: '/odata/v4/leave'
service LeaveService @(requires: 'authenticated-user') {

    @odata.draft.enabled
    entity LeaveRequests as projection on db.LeaveRequests actions {
        @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects : { TargetProperties : ['_it/status'] }
        )
        action approveLeave(comment : String) returns LeaveRequests;

        @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects : { TargetProperties : ['_it/status'] }
        )
        action rejectLeave(reason : String) returns LeaveRequests;
    };

    @readonly
    entity ApprovalLogs as projection on db.ApprovalLogs;
}`
      },
      {
        path: "srv/leave-service.js",
        language: "javascript",
        content: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { LeaveRequests, ApprovalLogs } = this.entities;

    // Validate date logic before creating a leave request
    this.before('CREATE', 'LeaveRequests', async (req) => {
        const { startDate, endDate } = req.data;
        if (new Date(startDate) > new Date(endDate)) {
            req.error(400, 'Start Date cannot exceed End Date.');
        }
        req.data.status = 'PENDING';
    });

    // Custom Action: Approve Leave
    this.on('approveLeave', async (req) => {
        const [id] = req.params;
        const comment = req.data.comment || 'Approved via autonomous workflow';
        const user = req.user.id || 'system.approver@sap.corp';

        await UPDATE(LeaveRequests, id).with({ status: 'APPROVED' });

        await INSERT.into(ApprovalLogs).entries({
            request_ID: id,
            approverEmail: user,
            action: 'APPROVED',
            comment: comment
        });

        return await SELECT.one.from(LeaveRequests, id);
    });

    // Custom Action: Reject Leave
    this.on('rejectLeave', async (req) => {
        const [id] = req.params;
        const reason = req.data.reason || 'Rejected by policy';
        const user = req.user.id || 'system.approver@sap.corp';

        await UPDATE(LeaveRequests, id).with({ status: 'REJECTED' });

        await INSERT.into(ApprovalLogs).entries({
            request_ID: id,
            approverEmail: user,
            action: 'REJECTED',
            comment: reason
        });

        return await SELECT.one.from(LeaveRequests, id);
    });
});`
      },
      {
        path: "mta.yaml",
        language: "yaml",
        content: `_schema-version: '3.1'
ID: employee-leave-service
version: 1.0.0
description: "SAP BTP CAP Autonomous Microservice"
parameters:
  enable-parallel-deployments: true

build-parameters:
  before-all:
    - builder: custom
      commands:
        - npm ci
        - npx cds build --production

modules:
  - name: employee-leave-srv
    type: nodejs
    path: gen/srv
    requires:
      - name: employee-leave-db
      - name: employee-leave-auth
    provides:
      - name: srv-api
        properties:
          srv-url: \${default-url}

  - name: employee-leave-db-deployer
    type: hdb
    path: gen/db
    requires:
      - name: employee-leave-db

resources:
  - name: employee-leave-db
    type: com.sap.xs.hdi-db
    parameters:
      service: hana
      service-plan: hdi-shared
  - name: employee-leave-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application`
      },
      {
        path: "test/requests.http",
        language: "http",
        content: `### 1. Get All Leave Requests
GET http://localhost:4004/odata/v4/leave/LeaveRequests
Authorization: Basic admin:secret

### 2. Create a New Leave Request
POST http://localhost:4004/odata/v4/leave/LeaveRequests
Content-Type: application/json
Authorization: Basic employee:secret

{
  "employeeId": "EMP_00921",
  "employeeName": "Priyadharshan Chandranath",
  "leaveType": "VACATION",
  "startDate": "2026-09-01",
  "endDate": "2026-09-05",
  "totalDays": 5,
  "reason": "Annual team retreat and personal leave"
}

### 3. Trigger Autonomous Approval
POST http://localhost:4004/odata/v4/leave/LeaveRequests(ID=c4a938b2-482a-43cf-827b-04e8d2e61234,IsActiveEntity=true)/LeaveService.approveLeave
Content-Type: application/json
Authorization: Basic manager:secret

{
  "comment": "Autonomous compliance check passed. Approved."
}`
      }
    ]
  },
  sales_fasttrack: {
    projectName: "sales-fasttrack-api",
    namespace: "sap.s4.fasttrack",
    description: "Side-by-side CAP application wrapping S/4HANA Sales Order APIs with high-throughput Redis caching and automated credit validation.",
    database: "SAP HANA Cloud",
    entities: [
      {
        name: "FastTrackOrders",
        annotations: ["@UI.LineItem"],
        elements: [
          { name: "orderID", type: "String(10)", key: true },
          { name: "customerCode", type: "String(10)", required: true },
          { name: "totalAmount", type: "Decimal(15,2)", required: true },
          { name: "currency", type: "String(3)", required: true },
          { name: "riskScore", type: "Decimal(3,2)" },
          { name: "autoApproved", type: "Boolean" }
        ]
      }
    ],
    files: [
      {
        path: "db/schema.cds",
        language: "cds",
        content: `namespace sap.s4.fasttrack;
using { cuid, managed } from '@sap/cds/common';

entity FastTrackOrders : cuid, managed {
    orderID      : String(10);
    customerCode : String(10) not null;
    totalAmount  : Decimal(15,2) not null;
    currency     : String(3) default 'EUR';
    riskScore    : Decimal(3,2);
    autoApproved : Boolean default false;
}`
      },
      {
        path: "srv/sales-service.cds",
        language: "cds",
        content: `using { sap.s4.fasttrack as db } from '../db/schema';

@path: '/odata/v4/fasttrack'
service SalesFastTrackService {
    @readonly
    entity FastTrackOrders as projection on db.FastTrackOrders;
    
    action evaluateAndCreateOrder(
        customerCode : String,
        amount : Decimal,
        currency : String
    ) returns FastTrackOrders;
}`
      }
    ]
  }
};
