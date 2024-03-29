import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { fullName } from '@/utils/avatarUtils';
import { Box, Chip } from '@mui/material';

export const conditionTypeOptions = [
  { label: 'Match ALL condition in this group', value: 'AND' },
  { label: 'Match ANY condition in this group', value: 'OR' },
];
export const taskStatusDropdown = ['Todo', 'In-Progress', 'Done'];
export const currencyDropdown = ['GBP'];
export const activityTypeDropdown = [
  'Calls',
  'Meetings',
  'Task',
  'Email',
  'Chat',
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
  index: any,
  subIndex: any,
  watch: any,
  dealDropdown: any,
  contactDropdown: any,
) => {
  const moduleType = watch('module');
  const keyDropdown = workflowModuleOption[moduleType] || [];
  const watchKey = watch(`groups.${index}.conditions.${subIndex}.fieldName`);
  let conditionOptions: string[] = [];
  if (moduleType === conditionNames?.deals) {
    const dealConditionIndex = dealConditionIndexMap[watchKey];
    conditionOptions = dealConditions[dealConditionIndex] || [];
  } else if (moduleType === conditionNames?.quotes) {
    const quoteConditionIndex = quoteConditionIndexMap[watchKey];
    conditionOptions = quoteConditions[quoteConditionIndex] || [];
  } else if (moduleType === conditionNames?.tasks) {
    const taskConditionIndex = taskConditionIndexMap[watchKey];
    conditionOptions = taskConditions[taskConditionIndex] || [];
  }
  const watchCondition = watch(
    `groups.${index}.conditions.${subIndex}.condition`,
  );
  let component: any = RHFTextField;
  let componentProps: any = {
    placeholder: 'Type here',
  };

  if (moduleType === conditionNames?.deals) {
    if (
      watchKey === conditionNames?.name ||
      watchKey === conditionNames?.dealPipeline ||
      watchKey === conditionNames?.dealStage ||
      watchKey === conditionNames?.lostReason
    ) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
        };
      }
    } else if (
      watchKey === conditionNames?.dealValue ||
      watchKey === conditionNames?.expectedDealValue
    ) {
      component = RHFTextField;
      componentProps = {
        placeholder: 'Enter Value',
        type: 'number',
      };
    } else if (watchKey === conditionNames?.accountName) {
      component;
      componentProps;
    } else if (
      watchKey === conditionNames?.closeDate ||
      watchKey === conditionNames?.lastActivityDate ||
      watchKey === conditionNames?.createdAt ||
      watchKey === conditionNames?.updatedAt ||
      watchKey === conditionNames?.dealStageUpdatedAt ||
      watchKey === conditionNames?.lastAssignedAt
    ) {
      if (
        watchCondition === conditionNames?.onASpecificDate ||
        watchCondition === conditionNames?.afterASpecificDate ||
        watchCondition === conditionNames?.beforeASpecificDate
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
          disablePast: true,
        };
      } else if (
        watchCondition === conditionNames?.betweenADateRange ||
        watchCondition === conditionNames?.isUpdated
      ) {
        component = RHFSwitchableDatepicker;
        componentProps = {
          placeholder: 'Select Range',
          fullWidth: true,
        };
      } else if (watchCondition === conditionNames?.isBlank) {
        component = Box;
        componentProps = null;
      } else if (
        watchCondition === conditionNames?.before ||
        watchCondition === conditionNames?.after
      ) {
        component = Chip;
        componentProps = { label: 'Date' };
      }
    } else if (
      watchKey === conditionNames?.salesOwner ||
      watchKey === conditionNames?.createdBy ||
      watchKey === conditionNames?.updatedBy
    ) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          externalParams: { limit: 50 },
          placeholder: 'Select',
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          apiQuery: contactDropdown,
        };
      }
    } else if (watchKey === conditionNames?.currency) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select',
          options: currencyDropdown,
        };
      }
    } else if (watchKey === conditionNames?.lastActivityType) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select',
          options: activityTypeDropdown,
        };
      }
    }
  } else if (moduleType === conditionNames?.quotes) {
    if (watchKey === conditionNames?.updateQuoteName) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
        };
      }
    } else if (watchKey === conditionNames?.updateQuoteAmount) {
      (component = RHFTextField),
        (componentProps = {
          placeholder: 'Enter Value',
          type: 'number',
        });
    } else if (watchKey === conditionNames?.status) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Status',
            options: taskStatusDropdown,
          });
      }
    } else if (watchKey === conditionNames?.createdBy) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        (component = RHFAutocompleteAsync),
          (componentProps = {
            placeholder: 'Select',
            apiQuery: contactDropdown,
            externalParams: { limit: 50 },
            getOptionLabel: (option: any) =>
              fullName(option?.firstName, option?.lastName),
          });
      }
    } else if (
      watchKey === conditionNames?.createdDate ||
      watchKey === conditionNames?.expirationDate
    ) {
      if (
        watchCondition === conditionNames?.onASpecificDate ||
        watchCondition === conditionNames?.afterASpecificDate ||
        watchCondition === conditionNames?.beforeASpecificDate
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
          disablePast: true,
        };
      } else if (
        watchCondition === conditionNames?.betweenADateRange ||
        watchCondition === conditionNames?.isUpdated
      ) {
        component = RHFSwitchableDatepicker;
        componentProps = {
          placeholder: 'Select Range',
          fullWidth: true,
        };
      } else if (watchCondition === conditionNames?.isBlank) {
        component = Box;
        componentProps = null;
      } else if (
        watchCondition === conditionNames?.before ||
        watchCondition === conditionNames?.after
      ) {
        component = Chip;
        componentProps = { label: 'Date' };
      }
    }
  } else if (moduleType === conditionNames?.tasks) {
    if (watchKey === conditionNames?.status) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Status',
            options: taskStatusDropdown,
          });
      }
    } else if (
      watchKey === conditionNames?.dueDate ||
      watchKey === conditionNames?.completedDate
    ) {
      if (
        watchCondition === conditionNames?.onASpecificDate ||
        watchCondition === conditionNames?.afterASpecificDate ||
        watchCondition === conditionNames?.beforeASpecificDate
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
          disablePast: true,
        };
      } else if (
        watchCondition === conditionNames?.betweenADateRange ||
        watchCondition === conditionNames?.isUpdated
      ) {
        component = RHFSwitchableDatepicker;
        componentProps = {
          placeholder: 'Select Range',
          fullWidth: true,
        };
      } else if (watchCondition === conditionNames?.isBlank) {
        component = Box;
        componentProps = null;
      } else if (
        watchCondition === conditionNames?.before ||
        watchCondition === conditionNames?.after
      ) {
        component = Chip;
        componentProps = { label: 'Date' };
      }
    } else if (watchKey === conditionNames?.title) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
        };
      }
    } else if (watchKey === conditionNames?.createdBy) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          externalParams: { limit: 50 },
          placeholder: 'Select',
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          apiQuery: contactDropdown,
        };
      }
    } else if (watchKey === conditionNames?.taskType) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component;
        componentProps;
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty ||
        watchCondition === conditionNames?.isChanged
      ) {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Type',
            options: taskStatusDropdown,
          });
      }
    }
  }
  return [
    {
      _id: 5465,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldName`,
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
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        ...componentProps,
      },
      component: component,
    },
  ];
};

export const workflowModuleOption: any = {
  DEALS: [
    'Name',
    'Deal Value',
    'Account Name',
    'Deal Pipeline',
    'Deal Stage',
    'Lost Reason',
    'Close Date',
    'Sales Owner',
    'Currency',
    'Last Activity Type',
    'Last Activity Date',
    'Created By',
    'Created At',
    'Updated By',
    'Updated At',
    'Deal Stage Updated At',
    'Last Assigned At',
    'Expected Deal Value',
  ],
  QUOTES: [
    'Update Quote Name',
    'Update Quote Amount',
    'Status',
    'Created By',
    'Created Date',
    'Expiration Date',
  ],
  SALES_TASKS: [
    'Status',
    'Due Date',
    'Title',
    'Created By',
    'Task Type',
    'Completed Date',
  ],
};
export const dealConditions = [
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'is',
    'not equals',
    'greater than',
    'less than',
    'is between',
    'is empty',
    'is not empty',
    'is changed',
  ],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  ['is', 'is not', 'is changed'],
  ['is', 'is not', 'is changed'],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
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
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  [
    'is',
    'not equals',
    'greater than',
    'less than',
    'is between',
    'is empty',
    'is not empty',
    'is changed',
  ],
];
export const dealConditionIndexMap: any = {
  Name: 0,
  'Deal Value': 1,
  'Account Name': 2,
  'Deal Pipeline': 3,
  'Deal Stage': 4,
  'Lost Reason': 5,
  'Close Date': 6,
  'Sales Owner': 7,
  Currency: 8,
  'Last Activity Type': 9,
  'Last Activity Date': 10,
  'Created By': 11,
  'Created At': 12,
  'Updated By': 13,
  'Updated At': 14,
  'Deal Stage Updated At': 15,
  'Last Assigned At': 16,
  'Expected Deal Value': 17,
};
export const quoteConditions = [
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'is',
    'not equals',
    'greater than',
    'less than',
    'is between',
    'is empty',
    'is not empty',
    'is changed',
  ],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
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
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
];
export const quoteConditionIndexMap: any = {
  'Update Quote Name': 0,
  'Update Quote Amount': 1,
  Status: 2,
  'Created By': 3,
  'Created Date': 4,
  'Expiration Date': 5,
};
const taskConditions = [
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  ['is', 'is not', 'is empty', 'is not empty', 'is changed'],
  [
    'Before',
    'After',
    'On a specific date',
    'After a specific date',
    'Before a specific date',
    'Between a date range',
    'Is Updated',
    'Is Blank',
  ],
];
export const taskConditionIndexMap: any = {
  Status: 0,
  'Due Date': 1,
  Title: 2,
  'Created By': 3,
  'Task Type': 4,
  'Completed Date': 5,
};
export const conditionNames = {
  name: 'Name',
  dealPipeline: 'Deal Pipeline',
  dealStage: 'Deal Stage',
  lostReason: 'Lost Reason',
  is: 'is',
  isNot: 'is not',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
  isChanged: 'is changed',
  dealValue: 'Deal Value',
  expectedDealValue: 'Expected Deal Value',
  accountName: 'Account Name',
  closeDate: 'Close Date',
  lastActivityDate: 'Last Activity Date',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
  dealStageUpdatedAt: 'Deal Stage Updated At',
  lastAssignedAt: 'Last Assigned At',
  onASpecificDate: 'On a specific date',
  afterASpecificDate: 'After a specific date',
  beforeASpecificDate: 'Before a specific date',
  betweenADateRange: 'Between a date range',
  isUpdated: 'Is Updated',
  isBlank: 'Is Blank',
  before: 'Before',
  after: 'After',
  salesOwner: 'Sales Owner',
  createdBy: 'Created By',
  updatedBy: 'Updated By',
  currency: 'Currency',
  updateQuoteName: 'Update Quote Name',
  updateQuoteAmount: 'Update Quote Amount',
  status: 'Status',
  createdDate: 'Created Date',
  expirationDate: 'Expiration Date',
  dueDate: 'Due Date',
  completedDate: 'Completed Date',
  title: 'Title',
  taskType: 'Task Type',
  lastActivityType: 'Last Activity Type',
  quotes: 'QUOTES',
  tasks: 'SALES_TASKS',
  deals: 'DEALS',
};
