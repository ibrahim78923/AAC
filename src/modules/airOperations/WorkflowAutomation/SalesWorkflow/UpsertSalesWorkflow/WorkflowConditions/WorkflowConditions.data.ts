import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { fullName } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';
import { UseFormWatch } from 'react-hook-form';
import { DealPipelineStagesDropdown } from '../DealPipelineStagesDropdown';

export const conditionTypeOptions = [
  { label: 'Match ALL condition in this group', value: 'AND' },
  { label: 'Match ANY condition in this group', value: 'OR' },
];
export const taskStatusDropdown = ['Pending', 'Inprogress', 'Complete'];
export const activityTypeDropdown = ['Call', 'Email', 'Company'];
export const quoteStatus = ['DRAFT', 'PUBLISHED'];

export const workflowConditionsGroupDataArray = (index: number) => [
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
      required: true,
      options: conditionTypeOptions,
      getOptionLabel: (option: { label: string; value: string }) =>
        option?.label,
    },
    component: RHFAutocomplete,
  },
];

export const workflowConditionsDataArray = (
  index: number,
  subIndex: number,
  watch: UseFormWatch<any>,
  dealDropdown: any,
  stagesDropdown: any,
  adminUserDropdown: any,
) => {
  const moduleType = watch('module');
  const keyDropdown = workflowModuleOption[moduleType] || [];
  const sessionUser: any = getSession()?.user;
  const watchKey = watch(`groups.${index}.conditions.${subIndex}.fieldName`)
    ?.label;
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
  let component: any = Box;
  let componentProps: any = {};

  if (moduleType === conditionNames?.deals) {
    if (watchKey === conditionNames?.name) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFTextField;
        componentProps = {
          placeholder: 'Enter Deal Name',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    } else if (watchKey === conditionNames?.dealAmount) {
      component = RHFTextField;
      componentProps = {
        placeholder: 'Enter Amount',
        type: 'number',
      };
    } else if (watchKey === conditionNames?.dealPipeline) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          apiQuery: dealDropdown,
          externalParams: { meta: false },
          placeholder: 'Select Deal Pipeline',
        };
      } else {
        component = Box;
      }
    } else if (watchKey === conditionNames?.dealStage) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = DealPipelineStagesDropdown;
      } else {
        component = Box;
        0;
      }
    } else if (
      watchKey === conditionNames?.closeDate ||
      watchKey === conditionNames?.lastActivityDate ||
      watchKey === conditionNames?.createdAt ||
      watchKey === conditionNames?.updatedAt
    ) {
      if (
        watchCondition === conditionNames?.onASpecificDate ||
        watchCondition === conditionNames?.afterASpecificDate ||
        watchCondition === conditionNames?.beforeASpecificDate
      ) {
        component = RHFDatePicker;
        componentProps = {
          fullWidth: true,
        };
      } else if (watchCondition === conditionNames?.isBlank) {
        component = Box;
      }
    } else if (
      watchKey === conditionNames?.dealOwner ||
      watchKey === conditionNames?.createdBy ||
      watchKey === conditionNames?.updatedBy
    ) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          externalParams: {
            role: ROLES?.ORG_EMPLOYEE,
            organization: sessionUser?.organization?._id,
            limit: 500,
          },
          apiQuery: adminUserDropdown,
          placeholder: 'Select User',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    }
  } else if (moduleType === conditionNames?.quotes) {
    if (watchKey === conditionNames?.updateQuoteName) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFTextField;
        componentProps = {
          placeholder: 'Enter Name',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    } else if (watchKey === conditionNames?.createdBy) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          externalParams: {
            role: ROLES?.ORG_EMPLOYEE,
            organization: sessionUser?.organization?._id,
            limit: 500,
          },
          apiQuery: adminUserDropdown,
          placeholder: 'Select User',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
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
        };
      } else if (watchCondition === conditionNames?.isBlank) {
        component = Box;
      }
    } else if (watchKey === conditionNames?.status) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocomplete;
        componentProps = {
          options: quoteStatus,
          placeholder: 'Select Status',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    }
  } else if (moduleType === conditionNames?.tasks) {
    if (watchKey === conditionNames?.status) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select Status',
          options: taskStatusDropdown,
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    } else if (
      watchKey === conditionNames?.lastDate ||
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
        };
      } else if (watchCondition === conditionNames?.isBlank) {
        component = Box;
      }
    } else if (watchKey === conditionNames?.title) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFTextField;
        componentProps = {
          placeholder: 'Enter Task Name',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    } else if (watchKey === conditionNames?.createdBy) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocompleteAsync;
        componentProps = {
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          externalParams: {
            role: ROLES?.ORG_EMPLOYEE,
            organization: sessionUser?.organization?._id,
            limit: 500,
          },
          apiQuery: adminUserDropdown,
          placeholder: 'Select User',
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
      }
    } else if (watchKey === conditionNames?.taskType) {
      if (
        watchCondition === conditionNames?.is ||
        watchCondition === conditionNames?.isNot
      ) {
        component = RHFAutocomplete;
        componentProps = {
          placeholder: 'Select Type',
          options: activityTypeDropdown,
        };
      } else if (
        watchCondition === conditionNames?.isEmpty ||
        watchCondition === conditionNames?.isNotEmpty
      ) {
        component = Box;
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
        getOptionLabel: (option: any) =>
          option?.label ? option?.label : option,
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
    { label: 'Name', value: 'name' },
    { label: 'Deal Amount', value: 'amount' },
    { label: 'Deal Pipeline', value: 'dealPipelineId' },
    { label: 'Deal Stage', value: 'dealStageId' },
    { label: 'Close Date', value: 'closeDate' },
    { label: 'Deal Owner', value: 'ownerId' },
    { label: 'Last Activity Date', value: 'updatedAt' },
    { label: 'Created By', value: 'createdBy' },
    { label: 'Created At', value: 'createdAt' },
    { label: 'Updated By', value: 'updatedBy' },
    { label: 'Updated At', value: 'updatedAt' },
  ],
  QUOTES: [
    { label: 'Update Quote Name', value: 'name' },
    { label: 'Created By', value: 'createdBy' },
    { label: 'Created Date', value: 'createdAt' },
    { label: 'Expiration Date', value: 'expiryDate' },
    { label: 'Status', value: 'status' },
  ],
  SALES_TASKS: [
    { label: 'Status', value: 'status' },
    { label: 'Last Date', value: 'dueDate' },
    { label: 'Title', value: 'name' },
    { label: 'Created By', value: 'createdBy' },
    { label: 'Task Type', value: 'type' },
    { label: 'Completed Date', value: 'completeAt' },
  ],
};
export const dealConditions = [
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'equals',
    'not equals',
    'greater than',
    'less than',
    'is empty',
    'is not empty',
  ],
  ['is in', 'is not in'],
  ['is in', 'is not in'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
];
export const dealConditionIndexMap: any = {
  Name: 0,
  'Deal Amount': 1,
  'Deal Pipeline': 2,
  'Deal Stage': 3,
  'Close Date': 4,
  'Deal Owner': 5,
  'Last Activity Date': 6,
  'Created By': 7,
  'Created At': 8,
  'Updated By': 9,
  'Updated At': 10,
};
export const quoteConditions = [
  ['is in', 'is not in', 'is empty', 'is not empty'],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty'],
];
export const quoteConditionIndexMap: any = {
  'Update Quote Name': 0,
  'Created By': 1,
  'Created Date': 2,
  'Expiration Date': 3,
  Status: 4,
};
export const taskConditions = [
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  ['is in', 'is not in', 'is empty', 'is not empty'],
  [
    'on a specific date',
    'after a specific date',
    'before a specific date',
    'is blank',
  ],
];
export const taskConditionIndexMap: any = {
  Status: 0,
  'Last Date': 1,
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
  is: 'is in',
  isNot: 'is not in',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
  dealAmount: 'Deal Amount',
  expectedDealValue: 'Expected Deal Value',
  accountName: 'Account Name',
  closeDate: 'Close Date',
  lastActivityDate: 'Last Activity Date',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
  dealStageUpdatedAt: 'Deal Stage Updated At',
  lastAssignedAt: 'Last Assigned At',
  onASpecificDate: 'on a specific date',
  afterASpecificDate: 'after a specific date',
  beforeASpecificDate: 'before a specific date',
  isBlank: 'is blank',
  dealOwner: 'Deal Owner',
  createdBy: 'Created By',
  updatedBy: 'Updated By',
  currency: 'Currency',
  updateQuoteName: 'Update Quote Name',
  updateQuoteAmount: 'Update Quote Amount',
  status: 'Status',
  createdDate: 'Created Date',
  expirationDate: 'Expiration Date',
  lastDate: 'Last Date',
  completedDate: 'Completed Date',
  title: 'Title',
  taskType: 'Task Type',
  lastActivityType: 'Last Activity Type',
  quotes: 'QUOTES',
  tasks: 'SALES_TASKS',
  deals: 'DEALS',
};
