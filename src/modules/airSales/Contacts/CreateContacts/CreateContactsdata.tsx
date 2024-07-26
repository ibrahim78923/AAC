import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
// Define your Yup validation schema
export const contactsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid email')?.required('Required Field'),
  profilePicture: Yup?.string()?.trim()?.required('Required Field'),
  firstName: Yup?.string()
    ?.trim()
    ?.matches(/^[a-zA-Z]*$/, 'Alphabets Only')
    ?.required('Required Field'),
  lastName: Yup?.string()
    ?.trim()
    ?.matches(/^[a-zA-Z]*$/, 'Alphabets Only')
    ?.required('Required Field'),
  address: Yup?.string()?.trim()?.required('Required Field'),
  phoneNumber: Yup?.string()
    ?.matches(/^[0-9]*$/, 'must be a number')
    ?.min(10, 'Mininum 10 characters')
    ?.required('Required field'),
  whatsAppNumber: Yup?.string()
    ?.matches(/^[0-9]*$/, 'must be a number')
    ?.min(10, 'Mininum 10 characters')
    ?.required('Required field'),
  lifeCycleStageId: Yup?.string()?.trim()?.required('Required Field'),
  // contactOwner: Yup?.string()?.trim()?.required('Required Field'),
  statusId: Yup?.string()?.trim()?.required('Required Field'),
  jobTitle: Yup?.string()?.trim()?.required('Required Field'),
  dateOfJoining: Yup?.string()?.nullable()?.required('Required Field'),
  dateOfBirth: Yup?.string()?.nullable()?.required('Required Field'),
});

// Define your default values
export const contactsDefaultValues = {
  email: '',
  profilePicture: '',
  firstName: '',
  lastName: '',
  address: '',
  jobTitle: '',
  phoneNumber: null,
  whatsAppNumber: null,
  lifeCycleStageId: '',
  contactOwner: '',
  statusId: '',
  dateOfJoining: null,
  dateOfBirth: null,
};
export const contactsDataArray = (
  lifeCycleStagesData: any,
  contactStatusData: any,
) => {
  return [
    {
      componentProps: {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'profilePicture',
        label: 'Profile Picture',

        select: false,
      },
      md: 12,
      component: RHFDropZone,
    },
    {
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter Email',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Last Name',
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter Email',
        type: 'text',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'address',
        label: 'Address',
        placeholder: 'Enter Email',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'dateOfBirth',
        label: 'Date Of Birth',
        fullWidth: true,
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      title: 'Phone Number',
      componentProps: {
        name: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter Phone Email',
        type: 'number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'whatsAppNumber',
        label: 'WhatsApp Number',
        placeholder: 'Enter WhatsApp Number',
        type: 'number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Contact Owner',
      componentProps: {
        name: 'contactOwner',
        label: 'Contact Owner',
        select: true,
        options: [
          { value: 'savanahShane', label: 'Savanah Shane' },
          { value: 'phoenixBaker', label: 'Phoenix Baker' },
          { value: 'cameronWilliamson', label: 'Cameron Williamson' },
          { value: 'brooklynSimmons', label: 'Brooklyn Simmons' },
        ],
      },
      md: 12,
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'jobTitle',
        label: 'Job Title',
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
