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
) => {
  const moduleType = watch('module');
  const keyOptions = actionKeys[moduleType] || [];
  const watchKey = watch(`actions.${index}.key`);
  let component = RHFTextField;
  let componentProps: any = {};
  if (moduleType === 'DEALS') {
    if (watchKey === 'Set Deal Pipeline') {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: dealsDropdown,
          externalParams: { meta: false },
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Deal Stage') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setDealStageOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Amount') {
      (component = RHFTextField),
        (componentProps = {
          type: 'number',
          placeholder: 'Enter Amount',
        });
    } else if (watchKey === 'Set Close Date') {
      (component = RHFDatePicker),
        (componentProps = {
          disablePast: true,
          fullWidth: true,
        });
    } else if (watchKey === 'Set Deal Owner') {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: contactDropdown,
          externalParams: { limit: 50 },
          placeholder: 'Select',
          getOptionLabel: (option: any) =>
            fullName(option?.firstName, option?.lastName),
        });
    } else if (watchKey === 'Set Priority') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setPriorityOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Add line item') {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: productDropdown,
          externalParams: { limit: 50 },
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Billing Frequency') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setBillOption,
          placeholder: 'Select',
        });
    }
  } else if (moduleType === 'SALES_TASKS') {
    if (watchKey === 'Set Task Type') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setTaskTypeOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Priority') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setPriorityOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Task Status') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: setTaskStatusOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Select deal') {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: dealsDropdown,
          externalParams: { meta: false },
          placeholder: 'Select',
        });
    } else if (watchKey === 'Associate with records') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: associateOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Assigned to') {
      (component = RHFAutocompleteAsync),
        (componentProps = {
          apiQuery: dealsDropdown, // sales user list
          externalParams: { meta: false },
          placeholder: 'Select',
        });
    } else if (watchKey === 'Set Due Date') {
      (component = RHFDatePicker),
        (componentProps = {
          disablePast: true,
          fullWidth: true,
        });
    } else if (watchKey === 'Set Reminder') {
      (component = RHFAutocomplete),
        (componentProps = {
          options: reminderOption,
          placeholder: 'Select',
        });
    } else if (watchKey === 'Add Note') {
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
        name: `actions.${index}.key`,
        placeholder: 'Select',
        options: keyOptions,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 565,
      gridLength: 6,
      componentProps: {
        name: `actions.${index}.value`,
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
