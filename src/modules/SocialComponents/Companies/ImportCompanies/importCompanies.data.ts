import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS = [
  {
    _id: 'domain',
    label: 'Domain Name',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'name',
    label: 'Company Name',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'owner',
    label: 'Company Owner',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'createdAt',
    label: 'Created Date',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'industry',
    label: 'Industry',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'noOfEmloyee',
    label: 'No of Employees',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'type',
    label: 'Company Type',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'linkedInUrl',
    label: 'Linkedin Profile',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'totalRevenue',
    label: 'Annual Revenue',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'city',
    label: 'City',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
