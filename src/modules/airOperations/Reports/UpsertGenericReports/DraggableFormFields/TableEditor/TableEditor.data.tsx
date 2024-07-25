import { COLLECTION_NAME, FIELD_TYPE } from '@/constants/strings';

export const tableEditorData: any = {
  INVENTORY: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'assetType',
      collectionName: COLLECTION_NAME?.ASSET_TYPES,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'locationId',
      collectionName: COLLECTION_NAME?.LOCATION,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'departmentId',
      collectionName: COLLECTION_NAME?.DEPARTMENT,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'impact',
    },
  ],
  SOFTWARE: [
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'type',
    },
  ],
  CONTRACT: [
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'type',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'vendor',
      collectionName: COLLECTION_NAME?.VENDORS,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'approver',
      collectionName: COLLECTION_NAME?.USERS,
    },
  ],
  PURCHASE_ORDER: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'vendorId',
      collectionName: COLLECTION_NAME?.VENDORS,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'locationId',
      collectionName: COLLECTION_NAME?.LOCATION,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'departmentId',
      collectionName: COLLECTION_NAME?.DEPARTMENT,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
  ],
  TICKETS: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'requester',
      collectionName: COLLECTION_NAME?.USERS,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'category',
      collectionName: COLLECTION_NAME?.SERVICE_CATEGORIES,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'pirority',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'department',
      collectionName: COLLECTION_NAME?.DEPARTMENT,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'source',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'impact',
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'agent',
      collectionName: COLLECTION_NAME?.USERS,
    },
  ],
  DEALS: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'dealPipelineId',
      collectionName: COLLECTION_NAME?.DEAL_PIPELINES,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'priority',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'billingFrequency',
    },
  ],
  FORECAST: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'salesPipelineId',
      collectionName: COLLECTION_NAME?.SALES_PIPELINES,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'users',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'goalStatus',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'target',
    },
  ],
  CAMPAIGN: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'campaignOwner',
      collectionName: COLLECTION_NAME?.USERS,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
  ],
  LEADS: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'campaignOwner',
      collectionName: COLLECTION_NAME?.USERS,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
  ],
};
