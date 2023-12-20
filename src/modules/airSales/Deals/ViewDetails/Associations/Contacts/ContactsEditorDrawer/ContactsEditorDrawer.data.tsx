import * as Yup from 'yup';
import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

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

export const contactsDataArray = ({
  lifeCycleStagesData,
  contactStatusData,
}: any) => {
  return [
    {
      title: 'Email',
      componentProps: {
        name: 'email',
        label: 'Enter Email',
        placeholder: 'Enter Email',
        required: true,
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Profile Pictures',
      componentProps: {
        name: 'profilePicture',
        label: 'Profile Picture',

        select: false,
      },
      md: 12,
      component: RHFDropZone,
    },
    {
      title: 'First Name',
      componentProps: {
        name: 'firstName',
        label: 'Enter First Name',
        placeholder: 'Enter First Name',
        required: true,
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
        required: true,
        type: 'text',
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
        type: 'number',
        placeholder: 'Enter Number',
        required: true,
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
        placeholder: 'Enter Number',
        required: true,
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
        options: [],
      },
      md: 12,
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'jobTitle',
        label: 'Job Title',
        placeholder: 'Enter Job Title',
        required: true,
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
