import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const conditionTypeOptions = [
  { value: 'AND', label: 'Match ALL condition in this group' },
  { value: 'OR', label: 'Match ANY condition in this group' },
];

export const workflowConditionsGroupDataArray = (index: any) => [
  {
    _id: 9080,
    md: 6,
    componentProps: {
      name: `groups.${index}.name`,
      label: 'Add group name',
      size: 'small',
      required: true,
      placeholder: 'Name here',
    },
    component: RHFTextField,
  },
  {
    _id: 7865,
    md: 6,
    componentProps: {
      name: `groups.${index}.conditionType`,
      label: 'Condition Type',
      size: 'small',
      placeholder: 'Select',
      required: true,
      options: conditionTypeOptions,
      getOptionLabel: ({ label }: { label: string }) => label,
    },
    component: RHFAutocomplete,
  },
];
