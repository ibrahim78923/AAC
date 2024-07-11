import { COLLECTION_NAME, FIELD_TYPE } from '@/constants/strings';

export const tableEditorData: any = {
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
  EMAIL_MARKETING: [
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'status',
    },
    {
      fieldType: FIELD_TYPE?.STRING,
      fieldName: 'type',
    },
  ],
  LEAD_CTAS: [
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
