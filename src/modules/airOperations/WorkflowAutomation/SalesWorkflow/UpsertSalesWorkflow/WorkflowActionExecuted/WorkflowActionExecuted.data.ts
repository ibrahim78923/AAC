import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import { getSession } from '@/utils';
import { fullName } from '@/utils/avatarUtils';
import { DealPipelineStagesDropdown } from '../DealPipelineStagesDropdown';
const setPriorityOption = ['Low', 'Medium', 'High'];
const setBillOption = [
  'monthly',
  'quarterly',
  'semi annually',
  'annually',
  'two years',
];
const setTaskTypeOption = ['Call', 'Email'];
const setTaskStatusOption = ['Pending', 'Inprogress', 'Completed'];
const reminderOption = [
  'Today',
  'Tomorrow',
  'In_1_Business_Day',
  'In_2_Business_Day',
];
export const quoteStatus = ['DRAFT', 'PUBLISHED'];

export const actionsExecutedFields = (
  index: any,
  watch: any,
  dealsDropdown: any,
  stagesDropdown: any,
  adminUserDropdown: any,
) => {
  const moduleType = watch('module');
  const sessionUser: any = getSession()?.user;
  const keyOptions = actionKeys[moduleType] || [];
  const watchKey = watch(`actions.${index}.fieldName`)?.label;
  let component = RHFAutocomplete;
  let componentProps: any = { placeholder: 'Select Value', options: [] };
  if (moduleType === actionName?.deals) {
    if (watchKey === actionName?.setDealPipeline) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: dealsDropdown,
          externalParams: { meta: false },
          placeholder: 'Select Deal Pipeline',
        });
    } else if (watchKey === actionName?.setDealStage) {
      (component = DealPipelineStagesDropdown),
        (componentProps = {
          placeholder: 'Select Stage',
        });
    } else if (watchKey === actionName?.setAmount) {
      (component = RHFTextField),
        (componentProps = {
          type: 'number',
          placeholder: 'Enter Amount',
        });
    } else if (watchKey === actionName?.setCloseDate) {
      (component = RHFDatePicker),
        (componentProps = {
          fullWidth: true,
        });
    } else if (watchKey === actionName?.setDealOwner) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: adminUserDropdown,
          placeholder: 'Select User',
          externalParams: {
            role: ROLES?.ORG_EMPLOYEE,
            organization: sessionUser?.organization?._id,
            limit: 500,
          },
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
        });
    } else if (watchKey === actionName?.setPriority) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setPriorityOption,
          placeholder: 'Select Priority',
        });
    } else if (watchKey === actionName?.setBillingFrequency) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setBillOption,
          placeholder: 'Select Frequency',
        });
    }
  } else if (moduleType === actionName?.quotes) {
    if (watchKey === actionName?.status) {
      component = RHFAutocomplete;
      componentProps = {
        placeholder: 'Select Status',
        options: quoteStatus,
      };
    }
  } else if (moduleType === actionName?.salesTasks) {
    if (watchKey === actionName?.setTaskType) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setTaskTypeOption,
          placeholder: 'Select Type',
        });
    } else if (watchKey === actionName?.setPriority) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setPriorityOption,
          placeholder: 'Select Priority',
        });
    } else if (watchKey === actionName?.setTaskStatus) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setTaskStatusOption,
          placeholder: 'Select Status',
        });
    } else if (watchKey === actionName?.setAssignedTo) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: adminUserDropdown,
          placeholder: 'Select User',
          externalParams: {
            role: ROLES?.ORG_EMPLOYEE,
            organization: sessionUser?.organization?._id,
            limit: 500,
          },
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
        });
    } else if (watchKey === actionName?.setDueDate) {
      (component = RHFDatePicker),
        (componentProps = {
          fullWidth: true,
        });
    } else if (watchKey === actionName?.setReminder) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: reminderOption,
          placeholder: 'Select Reminder',
        });
    } else if (watchKey === actionName?.addNote) {
      (component = RHFTextField),
        (componentProps = {
          placeholder: 'Write Note here',
          multiline: true,
        });
    }
  }
  return [
    {
      _id: 456,
      gridLength: 6,
      componentProps: {
        name: `actions.${index}.fieldName`,
        placeholder: 'Select Action',
        options: keyOptions,
        getOptionLabel: (option: any) =>
          option?.label ? option?.label : option,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 565,
      gridLength: 6,
      componentProps: {
        name: `actions.${index}.fieldValue`,
        ...componentProps,
      },
      component: component,
    },
  ];
};

export const actionKeys: any = {
  DEALS: [
    { value: 'dealPipelineId', label: 'Set Deal Pipeline' },
    { value: 'dealStageId', label: 'Set Deal Stage' },
    { value: 'amount', label: 'Set Amount' },
    { value: 'closeDate', label: 'Set Close Date' },
    { value: 'ownerId', label: 'Set Deal Owner' },
    { value: 'priority', label: 'Set Priority' },
    { value: 'billingFrequency', label: 'Set Billing Frequency' },
  ],
  QUOTES: [{ value: 'status', label: 'Status' }],
  SALES_TASKS: [
    { value: 'type', label: 'Set Task Type' },
    { value: 'priority', label: 'Set Priority' },
    { value: 'status', label: 'Set Task Status' },
    { value: 'assignTo', label: 'Set Assigned to' },
    { value: 'dueDate', label: 'Set Due Date' },
    { value: 'reminder', label: 'Set Reminder' },
    { value: 'note', label: 'Add Note' },
  ],
};
export const actionName = {
  deals: 'DEALS',
  salesTasks: 'SALES_TASKS',
  quotes: 'QUOTES',
  setDealPipeline: 'Set Deal Pipeline',
  setDealStage: 'Set Deal Stage',
  setAmount: 'Set Amount',
  setCloseDate: 'Set Close Date',
  setDealOwner: 'Set Deal Owner',
  setPriority: 'Set Priority',
  addLineItem: 'Add line item',
  setBillingFrequency: 'Set Billing Frequency',
  setTaskType: 'Set Task Type',
  setTaskStatus: 'Set Task Status',
  selectDeal: 'Select deal',
  associateWithRecords: 'Associate with records',
  setAssignedTo: 'Set Assigned to',
  setDueDate: 'Set Due Date',
  setReminder: 'Set Reminder',
  addNote: 'Add Note',
  status: 'Status',
};
