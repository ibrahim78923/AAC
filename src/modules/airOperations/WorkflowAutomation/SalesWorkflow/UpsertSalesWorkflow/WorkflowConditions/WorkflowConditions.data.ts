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
  const watchCondition = watch(
    `groups.${index}.conditions.${subIndex}.condition`,
  );
  let component: any = Box;
  let componentProps: any = {};
  if (moduleType === 'DEALS') {
    if (
      watchKey === 'Name' ||
      watchKey === 'Deal Pipeline' ||
      watchKey === 'Deal Stage' ||
      watchKey === 'Lost reason'
    ) {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          multiple: true,
          placeholder: 'Select',
          externalParams: { meta: false },
        };
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
        };
      }
    } else if (
      watchKey === 'Deal Value' ||
      watchKey === 'Expected Deal Value'
    ) {
      component = RHFTextField;
      componentProps = {
        placeholder: 'Enter Value',
        type: 'number',
      };
    } else if (
      watchKey === 'Account Name' &&
      (watchCondition === 'is' || watchCondition === 'is not')
    ) {
      component = RHFTextField;
      componentProps;
    } else if (
      watchKey === 'Close Date' ||
      watchKey === 'Last Activity Date' ||
      watchKey === 'Created At' ||
      watchKey === 'Updated At' ||
      watchKey === 'Deal Stage Updated At' ||
      watchKey === 'Last Assigned At'
    ) {
      if (
        watchCondition === 'On a specific date' ||
        watchCondition === 'After a specific date' ||
        watchCondition === 'Before a specific date'
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
          disablePast: true,
        };
      } else if (
        watchCondition === 'Between a date range' ||
        watchCondition === 'Is Updated'
      ) {
        component = RHFSwitchableDatepicker;
        componentProps = {
          placeholder: 'Select Range',
          fullWidth: true,
        };
      } else if (watchCondition === 'Is Blank') {
        component = Box;
        componentProps = null;
      } else if (watchCondition === 'Before' || watchCondition === 'After') {
        component = Chip;
        componentProps = { label: 'Date' };
      }
    } else if (
      watchKey === 'Sales Owner' ||
      watchKey === 'Created By' ||
      watchKey === 'Updated By'
    ) {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocompleteAsync;
        componentProps = {
          multiple: true,
          externalParams: { limit: 50 },
          placeholder: 'Select',
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          apiQuery: contactDropdown,
        };
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
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
    } else if (watchKey === 'Currency') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select',
          multiple: true,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          options: ['GBP'],
        };
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select',
          options: ['GBP'],
        };
      }
    } else if (watchKey === 'Last Activity Type') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select',
          multiple: true,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          options: ['Calls', 'Meetings', 'Task', 'Email', 'Chat'],
        };
      }
    } else if (
      watchCondition === 'is empty' ||
      watchCondition === 'is not empty' ||
      watchCondition === 'is changed'
    ) {
      component = RHFAutocomplete;
      componentProps = {
        placeholder: 'Select',
        options: ['Calls', 'Meetings', 'Task', 'Email', 'Chat'],
      };
    }
  } else if (moduleType === 'QUOTES') {
    if (watchKey === 'Update Quote Name') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          multiple: true,
          placeholder: 'Select',
          externalParams: { meta: false },
        };
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
        };
      }
    } else if (watchKey === 'Update Quote Amount') {
      (component = RHFTextField),
        (componentProps = {
          placeholder: 'Enter Value',
          type: 'number',
        });
    } else if (watchKey === 'Status') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Status',
            multiple: true,
            isOptionEqualToValue: (option: any, newValue: any) =>
              option === newValue,
            options: ['Pending', 'In Progress', 'Completed'],
          });
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Status',
            options: ['Pending', 'In Progress', 'Completed'],
          });
      }
    } else if (watchKey === 'Created By') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        (component = RHFAutocompleteAsync),
          (componentProps = {
            placeholder: 'Select',
            multiple: true,
            apiQuery: contactDropdown,
            externalParams: { limit: 50 },
            getOptionLabel: (option: any) =>
              fullName(option?.firstName, option?.lastName),
          });
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
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
    } else if (watchKey === 'Created Date' || watchKey === 'Expiration Date') {
      if (
        watchCondition === 'On a specific date' ||
        watchCondition === 'After a specific date' ||
        watchCondition === 'Before a specific date'
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
          disablePast: true,
        };
      } else if (
        watchCondition === 'Between a date range' ||
        watchCondition === 'Is Updated'
      ) {
        component = RHFSwitchableDatepicker;
        componentProps = {
          placeholder: 'Select Range',
          fullWidth: true,
        };
      } else if (watchCondition === 'Is Blank') {
        component = Box;
        componentProps = null;
      } else if (watchCondition === 'Before' || watchCondition === 'After') {
        component = Chip;
        componentProps = { label: 'Date' };
      }
    }
  } else if (moduleType === 'SALES_TASKS') {
    if (watchKey === 'Status') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Status',
            multiple: true,
            isOptionEqualToValue: (option: any, newValue: any) =>
              option === newValue,
            options: ['Pending', 'In Progress', 'Completed'],
          });
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Status',
            options: ['Pending', 'In Progress', 'Completed'],
          });
      }
    } else if (watchKey === 'Due Date' || watchKey === 'Completed Date') {
      if (
        watchCondition === 'On a specific date' ||
        watchCondition === 'After a specific date' ||
        watchCondition === 'Before a specific date'
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
          disablePast: true,
        };
      } else if (
        watchCondition === 'Between a date range' ||
        watchCondition === 'Is Updated'
      ) {
        component = RHFSwitchableDatepicker;
        componentProps = {
          placeholder: 'Select Range',
          fullWidth: true,
        };
      } else if (watchCondition === 'Is Blank') {
        component = Box;
        componentProps = null;
      } else if (watchCondition === 'Before' || watchCondition === 'After') {
        component = Chip;
        componentProps = { label: 'Date' };
      }
    } else if (watchKey === 'Title') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          multiple: true,
          placeholder: 'Select',
          externalParams: { meta: false },
        };
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
        };
      }
    } else if (watchKey === 'Created By') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        component = RHFAutocompleteAsync;
        componentProps = {
          multiple: true,
          externalParams: { limit: 50 },
          placeholder: 'Select',
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          apiQuery: contactDropdown,
        };
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
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
    } else if (watchKey === 'Task Type') {
      if (watchCondition === 'is' || watchCondition === 'is not') {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Type',
            multiple: true,
            isOptionEqualToValue: (option: any, newValue: any) =>
              option === newValue,
            options: ['Call', 'Email'],
          });
      } else if (
        watchCondition === 'is empty' ||
        watchCondition === 'is not empty' ||
        watchCondition === 'is changed'
      ) {
        (component = RHFAutocomplete),
          (componentProps = {
            placeholder: 'Select Type',
            options: ['Todo', 'In-Progress', 'Done'],
          });
      }
    }
  }
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
        ...componentProps,
      },
      component: component,
    },
  ];
};

const salesTaskDropdown = [
  'Status',
  'Due Date',
  'Title',
  'Created By',
  'Task Type',
  'Completed Date',
];
const dealsDropdown = [
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
];
const quotesDropdown = [
  'Update Quote Name',
  'Update Quote Amount',
  'Status',
  'Created By',
  'Created Date',
  'Expiration Date',
];
export const workflowModuleOption: any = {
  DEALS: dealsDropdown,
  QUOTES: quotesDropdown,
  SALES_TASKS: salesTaskDropdown,
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
