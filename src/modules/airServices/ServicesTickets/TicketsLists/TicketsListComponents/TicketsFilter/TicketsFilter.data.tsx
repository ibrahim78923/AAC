import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

const ticketsTypeOptions = [
  {
    value: 'search',
    label: 'Search',
  },
  {
    value: 'All Tickets',
    label: 'All Tickets',
  },
  {
    value: 'Urgent and High Priority',
    label: 'Urgent and High Priority',
  },
  {
    value: 'My Open and Pending Tickets',
    label: 'My Open and Pending Tickets',
  },
  {
    value: 'Spam',
    label: 'Spam',
  },
  {
    value: 'New & My Open Tickets',
    label: 'New & My Open Tickets',
  },
  {
    value: 'All Unresolved Tickets',
    label: 'All Unresolved Tickets',
  },
  {
    value: 'Incidents',
    label: 'Incidents',
  },
  {
    value: 'Service Requests',
    label: 'Service Requests',
  },
  {
    value: 'Tickets I Requested',
    label: 'Tickets I Requested',
  },
  {
    value: 'Shared with me',
    label: 'Shared with me',
  },
];

export const ticketsFilterDefaultFormValues = {
  ticketType: '',
  created: '',
  status: '',
  agents: '',
  requester: '',
  priority: '',
  impact: '',
  urgency: '',
};

export const ticketsFilterDefaultFormValuesFunction = (
  data: any = ticketsFilterDefaultFormValues,
) => {
  return {
    ticketType: data?.ticketType,
    created: data?.created,
    status: data?.status,
    agents: data?.agents,
    requester: data?.requester,
    priority: data?.priority,
    impact: data?.impact,
    urgency: data?.urgency,
  };
};

export const ticketsFilterFormSchema: any = Yup.object().shape({
  ticketType: Yup.string(),
  created: Yup.string(),
  status: Yup.string(),
  agents: Yup.string(),
  requester: Yup.string(),
  priority: Yup.string(),
  impact: Yup.string(),
  urgency: Yup.string(),
});

export const ticketsFilterFormFieldsDataFunction = (isFieldDisable = false) => [
  {
    id: 2,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'ticketType',
      label: 'Ticket Type',
      select: true,
      options: ticketsTypeOptions,
      disabled: isFieldDisable,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'createdOn',
      label: 'Created On',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 200,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'agents',
      label: 'Agents',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'requester',
      label: 'Requester',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 100,
    componentProps: {
      fullWidth: true,
      name: 'priority',
      label: 'Priority',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 82,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 96,
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 97,
    componentProps: {
      fullWidth: true,
      name: 'plannedStartDate',
      label: 'Planned Start Date',
    },
    gridLength: 9,
    component: RHFDatePicker,
  },
  {
    id: 985,
    componentProps: {
      name: 'plannedStartTime',
      sx: { mt: 2.3 },
    },
    gridLength: 3,
    component: RHFTimePicker,
  },
  {
    id: 974,
    componentProps: {
      fullWidth: true,
      name: 'plannedEndDate',
      label: 'Planned End Date',
    },
    gridLength: 9,
    component: RHFDatePicker,
  },
  {
    id: 958,
    componentProps: {
      name: 'plannedEndTime',
      fullWidth: true,
      sx: { mt: 2.3 },
    },
    gridLength: 3,
    component: RHFTimePicker,
  },
  {
    id: 9657,
    componentProps: {
      fullWidth: true,
      name: 'dueByDate',
      label: 'Due By',
    },
    gridLength: 8,
    component: RHFDatePicker,
  },
  {
    id: 98676,
    componentProps: {
      fullWidth: true,
      name: 'dueByTime',
      sx: { mt: 2.3 },
    },
    gridLength: 4,
    component: RHFTimePicker,
  },
  {
    id: 96215,
    componentProps: {
      fullWidth: true,
      name: 'typeSource',
      label: 'Type Source',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },
];
