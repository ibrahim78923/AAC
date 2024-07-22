import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS = [
  {
    _id: 'name',
    label: 'Task name',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'type',
    label: 'Task type',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'priority',
    label: 'Priority',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'status',
    label: 'Task status',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'createdAt',
    label: 'Created at',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  {
    _id: 'dueDate',
    label: 'Last Date',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
