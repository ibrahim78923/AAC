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
  // contactOwnerId: Yup?.string()?.trim()?.required('Required Field'),
  statusId: Yup?.string()?.trim()?.required('Required Field'),
  jobTitle: Yup?.string()?.trim()?.required('Required Field'),
  dateOfJoinig: Yup?.string()?.nullable()?.required('Required Field'),
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
  contactOwnerId: '',
  statusId: '',
  dateOfJoinig: null,
  dateOfBirth: null,
};
export const contactsDataArray = (
  contactOwnerData: any,
  lifeCycleStagesData: any,
  contactStatusData: any,
) => {
  return [
    {
      id: 'email',
      componentProps: {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'profilePicture',
      componentProps: {
        name: 'profilePicture',
        label: 'Profile Picture',

        select: false,
      },
      md: 12,
      component: RHFDropZone,
    },
    {
      id: 'firstName',
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter Email',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'lastName',
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
      id: 'address',
      componentProps: {
        name: 'address',
        label: 'Address',
        placeholder: 'Enter Email',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'dateOfBirth',
      componentProps: {
        name: 'dateOfBirth',
        label: 'Date Of Birth',
        fullWidth: true,
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      id: 'phoneNumber',
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
      id: 'whatsAppNumber',
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
      id: 'contactOwnerId',
      title: 'Contact Owner',
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        select: true,
      },
      options: contactOwnerData,
      md: 12,
      component: RHFSelect,
    },
    {
      id: 'jobTitle',
      componentProps: {
        name: 'jobTitle',
        label: 'Job Title',
        placeholder: 'Enter Job Title',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'lifeCycleStageId',
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
      id: 'statusId',
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
      id: 'dateOfJoinig',
      title: 'Date of Joining',
      componentProps: {
        name: 'dateOfJoinig',
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
