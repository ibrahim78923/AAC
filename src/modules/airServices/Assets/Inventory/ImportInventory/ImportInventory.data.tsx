import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS_INVENTORY = [
  {
    _id: 'displayName',
    label: 'Display Name',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'assetType',
    label: 'Asset Type',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  { _id: 'impact', label: 'Impact', groupBy: FIELD_TYPES?.OPTIONAL_FIELD },
  {
    _id: 'description',
    label: 'Description',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'assetLifeExpiry',
    label: 'Asset Life Expiry',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'locationId',
    label: 'Location Id',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'departmentId',
    label: 'Department Id',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'usedBy',
    label: 'Used By',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'assignedOn',
    label: 'Assigned On',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
