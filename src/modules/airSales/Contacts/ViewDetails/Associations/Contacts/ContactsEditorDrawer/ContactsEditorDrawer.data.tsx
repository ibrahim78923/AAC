import {
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const contactsValidationSchema = Yup.object().shape({
  email: Yup.string().trim().required('Field is Required'),
  tasktype: Yup.string().trim().required('Field is Required'),
  priority: Yup.string().trim().required('Field is Required'),
  taskstatus: Yup.string().trim().required('Field is Required'),
  selectdeal: Yup.string().trim().required('Field is Required'),
  assignedto: Yup.string().trim().required('Field is Required'),
  associatewithrecords: Yup.string().trim().required('Field is Required'),
  reminder: Yup.string().trim().required('Field is Required'),
  note: Yup.string().trim().required('Field is Required'),
});

export const contactsDefaultValues = {
  email: '',
  tasktype: '',
  priority: '',
  taskstatus: '',
  selectdeal: '',
  assignedto: '',
  associatewithrecords: '',
  reminder: '',
  note: '',
};

export const contactsDataArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'profilephoto',
      label: 'Profile Photo',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'contactowner',
      label: 'Contact Owner',
      select: true,
    },
    options: [
      { value: 'Guy   Hawkins', label: 'Guy  Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobtitle',
      label: 'Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'lifeCycleStage',
      label: 'Life Cycle Stage',
      select: true,
    },
    options: [
      { value: 'Lead', label: 'Lead' },
      { value: 'Sale Qualified Lead', label: 'Sale Qualified Lead' },
      { value: 'Customer', label: 'Customer' },
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
      { value: 'Open', label: 'Open' },
      { value: 'Inprogress', label: 'Inprogress' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'dateOfOpening',
      label: 'Date of Opening',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'joiningTime',
      label: 'Joining Time ',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'addAnotherContact',
      label: 'Add Another Contact',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add Contacts',
  Edit: 'Edit Contacts',
  View: 'View Contacts',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
