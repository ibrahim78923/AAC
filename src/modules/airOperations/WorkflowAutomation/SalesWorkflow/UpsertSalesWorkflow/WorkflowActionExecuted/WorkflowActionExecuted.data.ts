import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { fullName } from '@/utils/avatarUtils';

const setDealStageOption = [
  'New',
  'Follow up',
  'Under Review',
  'Demo',
  'Negotiation',
  'Won',
  'Lost',
];
const setPriorityOption = ['Low', 'Medium', 'High'];
const setBillOption = ['Monthly', 'Quarterly'];
const setTaskTypeOption = ['Call', 'Email'];
const setTaskStatusOption = ['Pending', 'In-Progress', 'Completed'];
const associateOption = ['Companies', 'Contacts', 'Deals', 'Tickets'];
const reminderOption = [
  'Today',
  'Tomorrow',
  'In 2 business day',
  'In 3 business day',
  'In a week',
];

export const actionsExecutedFields = (
  index: any,
  watch: any,
  dealsDropdown: any,
  contactDropdown: any,
  productDropdown: any,
  userDropdown: any,
) => {
  const moduleType = watch('module');
  const keyOptions = actionKeys[moduleType] || [];
  const watchKey = watch(`actions.${index}.fieldName`);
  let component = RHFTextField;
  let componentProps: any = { placeholder: 'Type here' };
  if (moduleType === actionName?.deals) {
    if (watchKey === actionName?.setDealPipeline) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: dealsDropdown,
          externalParams: { meta: false },
          placeholder: 'Select Deal',
        });
    } else if (watchKey === actionName?.setDealStage) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setDealStageOption,
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
          disablePast: true,
          fullWidth: true,
        });
    } else if (watchKey === actionName?.setDealOwner) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: contactDropdown,
          externalParams: { limit: 50 },
          placeholder: 'Select Contact',
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
        });
    } else if (watchKey === 'Set Priority') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setPriorityOption,
          placeholder: 'Select Priority',
        });
    } else if (watchKey === actionName?.addLineItem) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: productDropdown,
          externalParams: { limit: 50 },
          placeholder: 'Select Product',
        });
    } else if (watchKey === actionName?.setBillingFrequency) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setBillOption,
          placeholder: 'Select Frequency',
        });
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
    } else if (watchKey === actionName?.selectDeal) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: dealsDropdown,
          externalParams: { meta: false },
          placeholder: 'Select Deal',
        });
    } else if (watchKey === actionName?.associateWithRecords) {
      (component = RHFAutocomplete),
        (componentProps = {
          options: associateOption,
          placeholder: 'Select Record',
        });
    } else if (watchKey === actionName?.setAssignedTo) {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: userDropdown,
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
          placeholder: 'Select User',
        });
    } else if (watchKey === actionName?.setDueDate) {
      (component = RHFDatePicker),
        (componentProps = {
          disablePast: true,
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
    'Set Deal Pipeline',
    'Set Deal Stage',
    'Set Amount',
    'Set Close Date',
    'Set Deal Owner',
    'Set Priority',
    'Add line item',
    'Set Billing Frequency',
    'Send Email to contacts',
  ],
  QUOTES: ['Send Email to contacts'],
  SALES_TASKS: [
    'Set Task Type',
    'Set Priority',
    'Set Task Status',
    'Select deal',
    'Associate with records',
    'Set Assigned to',
    'Set Due Date',
    'Set Reminder',
    'Add Note',
    'Send Email to contacts',
  ],
};
export const actionName = {
  deals: 'DEALS',
  salesTasks: 'SALES_TASKS',
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
};
