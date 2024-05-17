import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
// import useCreateContacts from './useCreateContacts';
// Define your Yup validation schema
export const contactsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid email')?.required('Required Field'),
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
  dateOfBirth: null,
  dateOfJoining: null,
};
export const contactsDataArray = (
  contactStatusData: any,
  lifeCycleStagesData: any,
  userList: any,
) => {
  const maxDate = new Date();
  return [
    {
      componentProps: {
        name: 'email',
        label: 'Email',
        placeholder: 'Search or Enter Email',
        required: true,
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
        require: true,
      },
      md: 12,
      component: RHFTextField,
    },
    {
      title: 'Last Name',
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        type: 'text',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'address',
        label: 'Address',
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
        maxDate: maxDate,
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      title: 'Phone Number',
      componentProps: {
        name: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter Phone Number',
        // type: 'number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'whatsAppNumber',
        label: 'WhatsApp Number',
        placeholder: 'Enter WhatsApp Number',
        // type: 'number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        select: true,
      },
      options: userList?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: item?.firstName,
      })),
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
