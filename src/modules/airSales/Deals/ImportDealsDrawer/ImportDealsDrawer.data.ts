import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS = [
  { _id: 'name', label: 'Deal Name', groupBy: FIELD_TYPES?.MANDATORY_FIELD },
  {
    _id: 'dealPipeline',
    label: 'Pipeline',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'dealStage',
    label: 'Deal Stage',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'amount',
    label: 'Amount',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'dealOwner',
    label: 'Deal Owner',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'priority',
    label: 'Priority',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'createdDate',
    label: 'Created Date',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'closeDate',
    label: 'Close Date',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
