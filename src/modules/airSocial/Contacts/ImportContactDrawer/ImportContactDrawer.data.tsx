import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS = [
  { _id: 'email', label: 'Email', groupBy: FIELD_TYPES?.MANDATORY_FIELD },
  {
    _id: 'firstName',
    label: 'First Name',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'lastName',
    label: 'Last Name',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'address',
    label: 'Address',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'dateOfBirth',
    label: 'Date Of Birth',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'dealOwner',
    label: 'Deal Owner',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'phoneNumber',
    label: 'Phone Number',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'whatsAppNumber',
    label: 'WhatsApp Number',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
