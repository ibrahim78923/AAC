import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS_LOCATION = [
  {
    _id: 'locationname',
    label: 'Location Name',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'contactName',
    label: 'Contact Name',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  { _id: 'phone', label: 'Phone', groupBy: FIELD_TYPES?.OPTIONAL_FIELD },
  {
    _id: 'email',
    label: 'Email',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'addressLine1',
    label: 'Address Line 1',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'addressLine2',
    label: 'Address Line 2',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'country',
    label: 'Country',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'state',
    label: 'State',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'city',
    label: 'City',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'zipCode',
    label: 'Zip Code',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
