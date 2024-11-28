import { BACKEND_COLLECTION_NAME } from '@/constants/api';
import { FIELD_TYPE } from '@/constants/strings';

export const tableEditorData: any = {
  INVENTORY: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'assetType',
      collectionName: BACKEND_COLLECTION_NAME?.ASSET_TYPES,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'locationId',
      collectionName: BACKEND_COLLECTION_NAME?.LOCATION,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'departmentId',
      collectionName: BACKEND_COLLECTION_NAME?.DEPARTMENT,
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
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'contractType',
      collectionName: BACKEND_COLLECTION_NAME?.CONTRACT_TYPE,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'vendor',
      collectionName: BACKEND_COLLECTION_NAME?.VENDORS,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'approver',
      collectionName: BACKEND_COLLECTION_NAME?.USERS,
    },
  ],
  PURCHASE_ORDER: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'vendorId',
      collectionName: BACKEND_COLLECTION_NAME?.VENDORS,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'locationId',
      collectionName: BACKEND_COLLECTION_NAME?.LOCATION,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'departmentId',
      collectionName: BACKEND_COLLECTION_NAME?.DEPARTMENT,
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
      collectionName: BACKEND_COLLECTION_NAME?.USERS,
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'category',
      collectionName: BACKEND_COLLECTION_NAME?.SERVICE_CATEGORIES,
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
      collectionName: BACKEND_COLLECTION_NAME?.DEPARTMENT,
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
      collectionName: BACKEND_COLLECTION_NAME?.USERS,
    },
  ],
  DEALS: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'dealPipelineId',
      collectionName: BACKEND_COLLECTION_NAME?.DEAL_PIPELINES,
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
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'goalName',
    },
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'goalPipelineId',
      collectionName: BACKEND_COLLECTION_NAME?.FORECAST_PIPELINES,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'target',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'duration',
    },
  ],
  CAMPAIGN: [
    {
      fieldType: FIELD_TYPE?.OBJECT_ID,
      fieldName: 'campaignOwner',
      collectionName: BACKEND_COLLECTION_NAME?.USERS,
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
  ],
  LEADS: [
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'clickCount',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'viewCount',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'clickRate',
    },
  ],
};
