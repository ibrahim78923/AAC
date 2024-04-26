export const moduleOptions = [
  { value: 'DEALS', label: 'Deals' },
  { value: 'QUOTES', label: 'Quotes' },
  { value: 'SALES_TASKS', label: 'Tasks' },
];
export const andRunOptions = [
  { label: 'Once, for each record', value: 'ONCE' },
  { label: 'Recurring, for the same record', value: 'RECURRENT' },
];

export const triggerOptions = [
  { label: 'When a record is created', value: 'created' },
  { label: 'When a record is updated', value: 'updated' },
  { label: 'When a record is deleted', value: 'deleted' },
];
export const workflowType = {
  EVENT_BASE: 'EVENT_BASE',
};
