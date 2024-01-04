import {
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const contactsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.trim()?.required('Field is Required'),
  profilephoto: Yup?.string(),
  name: Yup?.string()?.trim()?.required('Field is Required'),
  contactowner: Yup?.string()?.trim()?.required('Field is Required'),
  phoneNumber: Yup?.string()?.trim()?.required('Field is Required'),
  jobtitle: Yup?.string()?.trim()?.required('Field is Required'),
  lifeCycleStage: Yup?.string(),
  status: Yup?.string(),
  dateOfOpening: Yup?.string(),
  joiningTime: Yup?.string(),
  addAnotherContact: Yup?.string(),
});

export const contactsDefaultValues = {
  email: '',
  profilephoto: '',
  name: '',
  contactowner: '',
  phoneNumber: '',
  jobtitle: '',
  lifeCycleStage: '',
  status: '',
  dateOfOpening: '',
  joiningTime: '',
  addAnotherContact: '',
};

export const contactsDataArray = (openDrawer: any) => {
  return [
    {
      componentProps: {
        name: 'email',
        label: 'Email',
        fullWidth: true,
        required: true,
        placeholder: 'Enter Email',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'profilephoto',
        label: 'Profile Photo',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFDropZone,
      md: 12,
    },
    {
      componentProps: {
        name: 'name',
        label: 'Name',
        fullWidth: true,
        required: true,
        placeholder: 'Enter Name',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'contactowner',
        label: 'Contact Owner',
        select: true,
        required: true,
        disabled: openDrawer === 'View',
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
        required: true,
        placeholder: 'Enter Phone Number',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'jobtitle',
        label: 'Job Title',
        fullWidth: true,
        required: true,
        placeholder: 'Enter Job Title',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'lifeCycleStage',
        label: 'Life Cycle Stage',
        select: true,
        disabled: openDrawer === 'View',
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
        disabled: openDrawer === 'View',
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
        disabled: openDrawer === 'View',
      },
      component: RHFDatePicker,
      md: 8,
    },
    {
      componentProps: {
        name: 'joiningTime',
        label: 'Joining Time ',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFTimePicker,
      md: 4,
    },
    {
      componentProps: {
        name: 'addAnotherContact',
        label: 'Add Another Contact',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFCheckbox,
      md: 12,
    },
  ];
};

export const drawerTitle: any = {
  Add: 'Add Contacts',
  Edit: 'Edit Contacts',
  View: 'View Contacts',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
