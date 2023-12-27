import { RHFAutocomplete } from '@/components/ReactHookForm';

export const conditionTypeOptions = [
  'Match ALL condition in this group',
  'Match ANY condition in this group',
];

export const workflowConditionsGroupDataArray = (index: any) => [
  {
    _id: 78,
    gridLength: 6,
    componentProps: {
      name: `workflowConditions.${index}.conditionType`,
      label: 'Condition Type',
      size: 'small',
      options: conditionTypeOptions,
    },
    component: RHFAutocomplete,
  },
];

export const conditionOptions = [
  'Ticket Fields',
  'Requester Fields',
  'Requested for Fields',
];

export const ticketsFieldsOptions = [
  'From Email',
  'To Email',
  'Ticket CC',
  'workspace',
  'Status',
];
export const fieldOptions = ['Is', 'Is not', 'Equal', 'Not equal', 'Contains'];
export const statusOptions = ['Open', 'Pending', 'Resolved', 'Close'];
export const TICKET_FIELDS = 'Ticket Fields';
