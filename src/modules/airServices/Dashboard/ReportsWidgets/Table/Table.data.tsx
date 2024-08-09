import { COLLECTION_NAME, FIELD_TYPE } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

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
};

const tableCell = (info: any) =>
  !!info?.getValue() ? info?.getValue() : '---';

const header = (column: any) => (
  <Typography variant="body2" fontWeight={600} textTransform={'capitalize'}>
    {column?.fieldName}
  </Typography>
);

export const TABLE_DATA_MAP: any = {
  assetType: {
    header: 'Asset Type',
    id: 'assetType',
    value: (info: any) => fullName(info?.getValue()?.name),
  },
  locationId: {
    header: 'Location',
    id: 'locationId',
    value: (info: any) => fullName(info?.getValue()?.locationName),
  },
  departmentId: {
    header: 'Department',
    id: 'departmentId',
    value: (info: any) => fullName(info?.getValue()?.name),
  },
  vendorId: {
    header: 'Vendor',
    id: 'vendorId',
    value: (info: any) =>
      fullName(info?.getValue()?.name, info?.getValue()?.lastName),
  },
  department: {
    header: 'Department',
    id: 'department',
    value: (info: any) => fullName(info?.getValue()?.name),
  },
  requester: {
    header: 'Requester',
    id: 'requester',
    value: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  agent: {
    header: 'Agent',
    id: 'agent',
    value: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  category: {
    header: 'Category',
    id: 'category',
    value: (info: any) => fullName(info?.getValue()?.categoryName),
  },
  vendor: {
    header: 'Vendor',
    id: 'vendor',
    value: (info: any) => fullName(info?.getValue()?.name),
  },
  approver: {
    header: 'Approver',
    id: 'approver',
    value: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  dealPipelineId: {
    header: 'Deal Pipeline',
    id: 'dealPipelineId',
    value: (info: any) => fullName(info?.getValue()?.name),
  },
  campaignOwner: {
    header: 'Campaign Owner',
    id: 'campaignOwner',
    value: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
};

export const makeDynamicColumn = (tableColumns: any) => {
  return tableColumns?.length
    ? tableColumns?.map((column: any) => ({
        accessorFn: (row: any) =>
          column?.fieldType === FIELD_TYPE?.OBJECT_ID
            ? row?.[TABLE_DATA_MAP?.[column?.fieldName]?.id] ?? '---'
            : row?.[column?.fieldName],
        id:
          column?.fieldType === FIELD_TYPE?.OBJECT_ID
            ? TABLE_DATA_MAP?.[column?.fieldName]?.id ?? '---'
            : column?.fieldName,
        header:
          column?.fieldType === FIELD_TYPE?.OBJECT_ID
            ? TABLE_DATA_MAP?.[column?.fieldName]?.header ?? '---'
            : header?.(column),
        cell:
          column?.fieldType === FIELD_TYPE?.OBJECT_ID
            ? TABLE_DATA_MAP?.[column?.fieldName]?.value ?? '---'
            : tableCell,
      }))
    : [];
};
