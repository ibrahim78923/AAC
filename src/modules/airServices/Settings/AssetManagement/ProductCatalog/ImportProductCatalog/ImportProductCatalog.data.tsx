import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS = [
  { _id: 'name', label: 'Name', groupBy: FIELD_TYPES?.MANDATORY_FIELD },
  {
    _id: 'assetType',
    label: 'Asset Type',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  { _id: 'status', label: 'Status', groupBy: FIELD_TYPES?.MANDATORY_FIELD },
  {
    _id: 'manufacturer',
    label: 'Manufacturer',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'modeOfProcurement',
    label: 'Mode of procurement',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'description',
    label: 'Description',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
