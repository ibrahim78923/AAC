import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { conditionTypeOptions } from '../UpsertScheduledWorkflow.data';

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
      placeholder: 'Select',
      options: conditionTypeOptions,
      getOptionLabel: ({ label }: { label: string }) => label,
    },
    component: RHFAutocomplete,
  },
];
