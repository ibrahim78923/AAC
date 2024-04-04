import * as Yup from 'yup';
import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

// Define your Yup validation schema
export const contactsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.required('Required Field'),
});

// Define your default values
export const contactsDefaultValues = {
  email: '',
};

export const contactsDataArray = ({
  lifeCycleStagesData,
  contactStatusData,
  contactOwnerData,
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
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'Contact Owner',
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
