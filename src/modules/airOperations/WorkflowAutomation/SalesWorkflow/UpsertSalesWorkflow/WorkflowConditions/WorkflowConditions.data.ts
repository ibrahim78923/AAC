import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

const conditionOptions = ['BE 1', 'BE 2', 'BE 3', 'BE 4'];
export const conditionTypeOptions = [
  'Match ALL condition in this group',
  'Match ANY condition in this group',
];
const workflowModuleOption: any = {
  Deals: 'Deals',
  Quotes: 'Quotes',
  Tasks: 'Tasks',
  Meetings: 'Meetings',
};

export const workflowConditionsGroupDataArray = (index: any) => [
  {
    _id: 9080,
    gridLength: 6,
    componentProps: {
      name: `workflowConditions.${index}.name`,
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
      name: `workflowConditions.${index}.conditionType`,
      label: 'Condition Type',
      size: 'small',
      options: conditionTypeOptions,
    },
    component: RHFAutocomplete,
  },
];

export const workflowConditionsDataArray = (
  moduleType: any,
  index: any,
  subIndex: any,
) => {
  const handlePlaceholder = () => workflowModuleOption[moduleType];
  return [
    {
      _id: 4576,
      gridLength: 3,
      componentProps: {
        name: `workflowConditions.${index}.nestedArray.${subIndex}.condition1`,
        size: 'small',
        placeholder: handlePlaceholder(),
      },
      component: RHFTextField,
    },
    {
      _id: 5465,
      gridLength: 3,
      componentProps: {
        name: `workflowConditions.${index}.nestedArray.${subIndex}.condition2`,
        size: 'small',
        placeholder: 'Select',
        options: conditionOptions,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 3456,
      gridLength: 3,
      componentProps: {
        name: `workflowConditions.${index}.nestedArray.${subIndex}.condition3`,
        size: 'small',
        placeholder: 'Select',
        options: conditionOptions,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 2545,
      gridLength: 3,
      componentProps: {
        name: `workflowConditions.${index}.nestedArray.${subIndex}.condition4`,
        size: 'small',
        placeholder: 'Type Here',
      },
      component: RHFTextField,
    },
  ];
};
