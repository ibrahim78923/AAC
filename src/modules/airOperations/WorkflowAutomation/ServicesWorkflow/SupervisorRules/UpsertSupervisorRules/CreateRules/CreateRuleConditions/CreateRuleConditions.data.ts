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
