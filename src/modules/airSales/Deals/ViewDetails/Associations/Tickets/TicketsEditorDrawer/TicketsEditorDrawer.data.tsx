import {
  RHFDropZone,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const ticketsValidationSchema = Yup.object().shape({
  subject: Yup.string().trim().required('Field is Required'),
  ticketStatus: Yup.string().trim().required('Field is Required'),
  requester: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const ticketsDefaultValues = {
  ticketStatus: 'New Ticket',
  subject: '',
  requester: '',
  description: '',
  category: '',
  status: '',
  priority: '',
  attachfile: '',
};

export const ticketsDataArray = [
  {
    componentProps: {
      name: 'ticketStatus',
      label: '',
      fullWidth: false,
      options: ['New Ticket', 'Existing Ticket'],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      select: true,
    },
    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'subject',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'Products Issues', label: 'Products Issues' },
      { value: 'Shipping Issues', label: 'Shipping Issues' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Waiting', label: 'Waiting' },
      { value: 'Closed', label: 'Closed' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add Tickets',
  Edit: 'Edit Tickets',
  View: 'View Tickets',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
