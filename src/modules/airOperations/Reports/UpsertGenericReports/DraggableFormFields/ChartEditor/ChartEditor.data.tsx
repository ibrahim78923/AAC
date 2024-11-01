import { BACKEND_COLLECTION_NAME } from '@/constants/api';

export const xAxesDataArray: any = {
  INVENTORY: [
    {
      label: 'Inventory Asset Type',
      value: 'inventory_assetType',
      ref: BACKEND_COLLECTION_NAME?.ASSET_TYPES,
    },
    {
      label: 'Inventory Location',
      value: 'inventory_locationId',
      ref: BACKEND_COLLECTION_NAME?.LOCATION,
    },
    {
      label: 'Inventory Department',
      value: 'inventory_departmentId',
      ref: BACKEND_COLLECTION_NAME?.DEPARTMENT,
    },
    { label: 'Impact', value: 'impact', ref: null },
  ],
  SOFTWARE: [
    { label: 'Status', value: 'status', ref: null },
    { label: 'Type', value: 'type', ref: null },
  ],
  CONTRACT: [
    {
      label: 'Contract Type',
      value: 'contractType',
      ref: BACKEND_COLLECTION_NAME?.CONTRACT_TYPE,
    },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Contract Vendor',
      value: 'contract_vendor',
      ref: BACKEND_COLLECTION_NAME?.VENDORS,
    },
    {
      label: 'Contract Approver',
      value: 'contract_approver',
      ref: BACKEND_COLLECTION_NAME?.USERS,
    },
  ],
  PURCHASE_ORDER: [
    {
      label: 'Purchase Order Vendor',
      value: 'purchaseOrder_vendorId',
      ref: BACKEND_COLLECTION_NAME?.VENDORS,
    },
    {
      label: 'Purchase Order Location',
      value: 'purchaseOrder_locationId',
      ref: BACKEND_COLLECTION_NAME?.LOCATION,
    },
    {
      label: 'Purchase Order Department',
      value: 'purchaseOrder_departmentId',
      ref: BACKEND_COLLECTION_NAME?.DEPARTMENT,
    },
    { label: 'Approval Status', value: 'approvalStatus', ref: null },
  ],
  TICKETS: [
    {
      label: 'Ticket Requester',
      value: 'ticket_requester',
      ref: BACKEND_COLLECTION_NAME?.USERS,
    },
    {
      label: 'Ticket Category',
      value: 'ticket_category',
      ref: BACKEND_COLLECTION_NAME?.SERVICE_CATEGORIES,
    },
    { label: 'Pirority', value: 'pirority', ref: null },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Ticket Department',
      value: 'ticket_department',
      ref: BACKEND_COLLECTION_NAME?.DEPARTMENT,
    },
    { label: 'Source', value: 'source', ref: null },
    { label: 'Impact', value: 'impact', ref: null },
    {
      label: 'Ticket Agent',
      value: 'ticket_agent',
      ref: BACKEND_COLLECTION_NAME?.USERS,
    },
  ],
  DEALS: [
    {
      label: 'Deals Pipelines',
      value: 'deals_dealPipelineId',
      ref: BACKEND_COLLECTION_NAME?.DEAL_PIPELINES,
    },
    { label: 'Priority', value: 'priority', ref: null },
    { label: 'Billing Frequency', value: 'billingFrequency', ref: null },
  ],
  FORECAST: [
    { label: 'Goal Name', value: 'goalName', ref: null },
    {
      label: 'Goals Pipelines',
      value: 'goals_pipelineId',
      ref: BACKEND_COLLECTION_NAME?.FORECAST_PIPELINES,
    },
    { label: 'Target', value: 'target', ref: null },
    { label: 'Status', value: 'status', ref: null },
    { label: 'Duration', value: 'duration', ref: null },
  ],
  CAMPAIGN: [
    {
      label: 'Campaign Owner ',
      value: 'campaign_campaignOwner',
      ref: BACKEND_COLLECTION_NAME?.USERS,
    },
    { label: 'Campaign Status', value: 'campaignStatus', ref: null },
  ],
  LEADS: [
    { label: 'Click Count', value: 'clickCount', ref: null },
    { label: 'View Count', value: 'viewCount', ref: null },
    { label: 'Click Rate', value: 'clickRate', ref: null },
  ],
};
