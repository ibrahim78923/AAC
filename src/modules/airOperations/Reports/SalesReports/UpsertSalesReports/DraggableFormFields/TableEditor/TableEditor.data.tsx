import { COLLECTION_NAME, FIELD_TYPE } from '@/constants/strings';

export const tableEditorData: any = {
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
  PIPELINE_FORECAST: [
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'type',
    },
  ],
  FORECAST_CATEGORY: [
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
};
