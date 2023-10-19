import { RHFSelect } from '@/components/ReactHookForm';

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

export const defaultValues = {
  vendor: '',
  status: '',
  createdDate: '',
  deliverDate: '',
  department: '',
};

export const filterFields = [
  {
    id: 2,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'vendor',
      select: true,
      options: ticketsTypeOptions,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'status',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'createdDate',
      label: 'created Date',
      select: true,
      options: dropdownDummy,
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
      name: 'deliverDate',
      label: 'Deliver Date',
      select: true,
      options: dropdownDummy,
    },
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'department',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 12,
    component: RHFSelect,
  },
];
