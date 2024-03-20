import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const conditionTypeOptions = [
  { label: 'Match ALL condition in this group', value: 'AND' },
  { label: 'Match ANY condition in this group', value: 'OR' },
];

export const workflowConditionsGroupDataArray = (index: any) => [
  {
    _id: 9080,
    gridLength: 6,
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
    gridLength: 6,
    componentProps: {
      name: `groups.${index}.conditionType`,
      label: 'Condition Type',
      size: 'small',
      placeholder: 'Select',
      options: conditionTypeOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];

export const workflowConditionsDataArray = (
  setValue: any,
  index: any,
  subIndex: any,
  watch: any,
) => {
  const moduleType = watch('module');
  const keyDropdown = workflowModuleOption[moduleType] || [];
  const watchKey = watch(`groups.${index}.conditions.${subIndex}.key`);
  let conditionOptions: string[] = [];
  if (moduleType === 'DEALS') {
    const dealConditionIndex = dealConditionIndexMap[watchKey];
    conditionOptions = dealConditions[dealConditionIndex] || [];
  } else if (moduleType === 'QUOTES') {
    const quoteConditionIndex = quoteConditionIndexMap[watchKey];
    conditionOptions = quoteConditions[quoteConditionIndex] || [];
  } else if (moduleType === 'SALES_TASKS') {
    const taskConditionIndex = taskConditionIndexMap[watchKey];
    conditionOptions = taskConditions[taskConditionIndex] || [];
  }
  // useEffect(() => {
  //   setValue(`groups.${index}.conditions.${subIndex}.key`, '');
  //   setValue(`groups.${index}.conditions.${subIndex}.condition`, '');
  //   setValue(`groups.${index}.conditions.${subIndex}.value`, '');
  // }, []);
  return [
    {
      _id: 5465,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.key`,
        size: 'small',
        placeholder: 'Select',
        options: keyDropdown,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 3456,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.condition`,
        size: 'small',
        placeholder: 'Select',
        options: conditionOptions,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 2545,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
        placeholder: 'Select',
        options: conditionOptions,
      },
      component: RHFAutocomplete,
    },
  ];
};

const salesTaskDropdown = [
  'status',
  'lastDate',
  'title',
  'createdBy',
  'outcome',
  'taskType',
  'completedDate',
];
const dealsDropdown = [
  'name',
  'dealValue',
  'accountName',
  'dealPipeline',
  'dealStage',
  'lostReason',
  'closeDate',
  'salesOwner',
  'currency',
  'lastActivityType',
  'lastActivityDate',
  'createdBy',
  'createdAt',
  'updatedBy',
  'updatedAt',
  'dealStageUpdatedAt',
  'lastAssignedAt',
  'expectedDealValue',
];
const quotesDropdown = [
  'updateQuoteName',
  'updateQuoteAmount',
  'status',
  'createdBy',
  'createdDate',
  'expirationDate',
];
export const workflowModuleOption: any = {
  DEALS: dealsDropdown,
  QUOTES: quotesDropdown,
  SALES_TASKS: salesTaskDropdown,
};
export const dealConditions = [
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'is',
    'is not equal to',
    'is greater than',
    'is less than',
    'is between',
    'is empty',
    'is not empty',
    'is changed',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is changed'],
  ['is in', 'is not in', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  [
    'is',
    'is not equal to',
    'is greater than',
    'is less than',
    'is between',
    'is empty',
    'is not empty',
    'is changed',
  ],
];
export const dealConditionIndexMap: any = {
  name: 0,
  dealValue: 1,
  accountName: 2,
  dealPipeline: 3,
  dealStage: 4,
  lostReason: 5,
  closeDate: 6,
  salesOwner: 7,
  currency: 8,
  lastActivityType: 9,
  lastActivityDate: 10,
  createdBy: 11,
  createdAt: 12,
  updatedBy: 13,
  updatedAt: 14,
  dealStageUpdatedAt: 15,
  lastAssignedAt: 16,
  expectedDealValue: 17,
};
export const quoteConditions = [
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'is',
    'is not equal to',
    'is greater than',
    'is less than',
    'is between',
    'is empty',
    'is not empty',
    'is changed',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
];
export const quoteConditionIndexMap: any = {
  updateQuoteName: 0,
  updateQuoteAmount: 1,
  status: 2,
  createdBy: 3,
  createdDate: 4,
  expirationDate: 5,
};
const taskConditions = [
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  ['is in', 'is not in', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'is exactly',
    'in the last',
    'in the next',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
];
export const taskConditionIndexMap: any = {
  status: 0,
  lastDate: 1,
  title: 2,
  createdBy: 3,
  outcome: 4,
  taskType: 5,
  completedDate: 6,
};
