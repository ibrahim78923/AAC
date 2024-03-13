import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const conditionTypeOptions = [
  'Match ALL condition in this group',
  'Match ANY condition in this group',
];

export const workflowConditionsGroupDataArray = (index: any) => [
  {
    _id: 9080,
    gridLength: 6,
    componentProps: {
      name: `groups.${index}.name`,
      label: 'Add group name',
      size: 'small',
      placeholder: 'Name here',
    },
    component: RHFTextField,
  },
  {
    _id: 7865,
    gridLength: 6,
    componentProps: {
      name: `groups.${index}.conditionType`,
      label: 'Condition Type',
      size: 'small',
      options: conditionTypeOptions,
    },
    component: RHFAutocomplete,
  },
];
