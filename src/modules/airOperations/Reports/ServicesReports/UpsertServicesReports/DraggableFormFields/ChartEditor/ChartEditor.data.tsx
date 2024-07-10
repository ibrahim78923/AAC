import { COLLECTION_NAME } from '@/constants/strings';

export const xAxesDataArray: any = {
  INVENTORY: [
    {
      label: 'Inventory Asset Type',
      value: 'inventory_assetType',
      ref: COLLECTION_NAME?.ASSET_TYPES,
    },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Inventory Location Id',
      value: 'inventory_locationId',
      ref: COLLECTION_NAME?.LOCATION,
    },
    {
      label: 'Inventory Department Id',
      value: 'inventory_departmentId',
      ref: COLLECTION_NAME?.DEPARTMENT,
    },
    { label: 'Impact', value: 'impact', ref: null },
  ],
  SOFTWARE: [
    { label: 'Status', value: 'status', ref: null },
    { label: 'Type', value: 'type', ref: null },
  ],
  CONTRACT: [
    { label: 'Contract Type', value: 'contractType', ref: null },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Contract Vendor',
      value: 'contract_vendor',
      ref: COLLECTION_NAME?.VENDORS,
    },
    {
      label: 'Contract Approver',
      value: 'contract_approver',
      ref: COLLECTION_NAME?.USERS,
    },
  ],
  PURCHASE_ORDER: [
    {
      label: 'Purchase Order Vendor',
      value: 'purchaseOrder_vendorId',
      ref: COLLECTION_NAME?.VENDORS,
    },
    {
      label: 'Purchase Order Location',
      value: 'purchaseOrder_locationId',
      ref: COLLECTION_NAME?.LOCATION,
    },
    {
      label: 'Purchase Order Department',
      value: 'purchaseOrder_departmentId',
      ref: COLLECTION_NAME?.DEPARTMENT,
    },
    { label: 'Approval Status', value: 'approvalStatus', ref: null },
  ],
  TICKETS: [
    {
      label: 'Ticket Requester',
      value: 'ticket_requester',
      ref: COLLECTION_NAME?.USERS,
    },
    {
      label: 'Ticket Category',
      value: 'ticket_category',
      ref: COLLECTION_NAME?.SERVICE_CATEGORIES,
    },
    { label: 'Pirority', value: 'pirority', ref: null },
    { label: 'Status', value: 'status', ref: null },
    {
      label: 'Ticket Department',
      value: 'ticket_department',
      ref: COLLECTION_NAME?.DEPARTMENT,
    },
    { label: 'Source', value: 'source', ref: null },
    { label: 'Impact', value: 'impact', ref: null },
    {
      label: 'Ticket Agent',
      value: 'ticket_agent',
      ref: COLLECTION_NAME?.USERS,
    },
  ],
};
