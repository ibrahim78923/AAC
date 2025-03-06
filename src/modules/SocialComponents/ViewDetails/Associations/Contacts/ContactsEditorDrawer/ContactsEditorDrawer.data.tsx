import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const contactsValidationSchema = Yup?.object()?.shape({
  existingContact: Yup?.string(),
  contactStatus: Yup?.string(),
  email: Yup?.string()?.email('Invalid email'),
  profilePicture: Yup?.string(),
  firstName: Yup?.string()
    ?.trim()
    ?.matches(/^[a-zA-Z]*$/, 'Alphabets Only'),
  lastName: Yup?.string()
    ?.trim()
    ?.matches(/^[a-zA-Z]*$/, 'Alphabets Only'),
  address: Yup?.string()?.trim(),
  // phoneNumber: Yup?.string()?.matches(/^[0-9]*$/, 'must be a number'),
  whatsAppNumber: Yup?.string()?.matches(/^[0-9]*$/, 'must be a number'),
  lifeCycleStageId: Yup?.string()?.trim(),
  contactOwner: Yup?.string(),
  statusId: Yup?.string()?.trim(),
  jobTitle: Yup?.string()?.trim(),
  dateOfJoining: Yup?.string()?.nullable(),
  dateOfBirth: Yup?.string()?.nullable(),
});

export const contactsDefaultValues = {
  existingContact: '',
  contactStatus: 'New Contact',
  email: '',
  profilePicture: '',
  firstName: '',
  lastName: '',
  address: '',
  jobTitle: '',
  phoneNumber: '',
  whatsAppNumber: '',
  lifeCycleStageId: '',
  contactOwner: '',
  statusId: '',
  dateOfJoining: null,
  dateOfBirth: null,
};

export const contactsDataArray = (
  openDrawer: any,
  lifeCycleStagesData: any,
  contactStatusData: any,
) => {
  return [
    {
      title: 'Email',
      componentProps: {
        name: 'email',
        label: 'Enter Email',
        placeholder: 'Enter Email',
        required: true,
        disabled: openDrawer === 'View',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'First Name',
      componentProps: {
        name: 'firstName',
        label: 'Enter First Name',
        placeholder: 'Enter First Name',
        disabled: openDrawer === 'View',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Last Name',
      componentProps: {
        name: 'lastName',
        label: ' Enter Last Name',
        placeholder: 'Enter Last Name',
        type: 'text',
        disabled: openDrawer === 'View',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Address',
      componentProps: {
        name: 'address',
        label: 'Enter Address',
        placeholder: 'Enter Address',
        disabled: openDrawer === 'View',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'dateOfBirth',
        label: 'Date Of Birth',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      title: 'Phone Number',
      componentProps: {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'text',
        disabled: openDrawer === 'View',
        placeholder: 'Enter Number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'WhatsApp Number',
      componentProps: {
        name: 'whatsAppNumber',
        label: 'WhatsApp Number',
        type: 'number',
        disabled: openDrawer === 'View',
        placeholder: 'Enter Number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Contact Owner',
      componentProps: {
        name: 'contactOwner',
        label: 'Contact Owner',
        disabled: openDrawer === 'View',
        select: true,
        options: [],
      },
      md: 12,
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'jobTitle',
        label: 'Job Title',
        disabled: openDrawer === 'View',
        placeholder: 'Enter Job Title',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Lifecycle Stage',
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        disabled: openDrawer === 'View',
        select: true,
      },
      options: lifeCycleStagesData,
      md: 12,
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'statusId',
        label: 'Status',
        disabled: openDrawer === 'View',
        select: true,
      },
      options: contactStatusData,
      md: 12,
      component: RHFSelect,
    },
    {
      title: 'Date of Joining',
      componentProps: {
        name: 'dateOfJoining',
        disabled: openDrawer === 'View',
        label: 'Date of Joining',
        fullWidth: true,
      },
      md: 12,
      component: RHFDatePicker,
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
