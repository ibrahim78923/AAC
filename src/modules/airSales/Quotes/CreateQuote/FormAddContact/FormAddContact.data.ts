import {
  RHFTextField,
  RHFSelect,
  RHFDropZone,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Field is Required'),
  name: Yup.string().required('Field is Required'),
  contactOwner: Yup.string().required('Field is Required'),
  jobTitle: Yup.string().required('Field is Required'),
});

export const initValues = {
  email: '',
  profilePicture: '',
  name: '',
  contactOwner: '',
  phoneNumber: '',
  jobTitle: '',
  lifecycleStage: '',
  status: '',
};

export const addContactFields = [
  {
    id: 'email',
    component: RHFTextField,
    componentProps: {
      name: 'email',
      label: 'Email*',
      placeholder: 'Search or Enter Email',
    },
  },
  {
    id: 'profilePicture',
    component: RHFDropZone,
    componentProps: {
      name: 'profilePicture',
    },
  },
  {
    id: 'name',
    component: RHFTextField,
    componentProps: {
      name: 'name',
      label: 'Name*',
      placeholder: 'John Doe',
    },
  },
  {
    id: 'contactOwner',
    component: RHFSelect,
    componentProps: {
      name: 'contactOwner',
      label: 'Contact Owner*',
      select: true,
    },
    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
  },
  {
    id: 'phoneNumber',
    component: RHFTextField,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: '+44 2556465064',
    },
  },
  {
    id: 'jobTitle',
    component: RHFTextField,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title*',
      placeholder: 'Sales Manager',
    },
  },
  {
    id: 'lifecycleStage',
    component: RHFSelect,
    componentProps: {
      name: 'lifecycleStage',
      label: 'Lifecycle Stage',
      select: true,
    },
    options: [
      { value: 'Lead', label: 'Lead' },
      { value: 'Sales Qualified lead', label: 'Sales Qualified lead' },
      { value: 'Lesile Alexander', label: 'Lesile Alexander' },
      { value: 'Customer', label: 'Customer' },
    ],
  },
  {
    id: 'status',
    component: RHFSelect,
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Open', label: 'Open' },
      { value: 'In Progress', label: 'In Progress' },
    ],
  },
];
