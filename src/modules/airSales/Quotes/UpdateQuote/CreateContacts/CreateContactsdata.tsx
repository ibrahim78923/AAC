import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import * as Yup from 'yup';

const phoneRegex = /^\+\d{1,3}[-.\s]?\d{10,}$/;
export const contactsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid email')?.required('Required Field'),
  phoneNumber: Yup.string()
    .nullable()
    .matches(phoneRegex, 'Phone number is not valid'),

  whatsAppNumber: Yup.string()
    .nullable()
    .matches(phoneRegex, 'Phone number is not valid'),
});

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
export const contactsDataArray = (contactDataArrayParasm: any) => {
  const { contactsStatus, lifeCycleStages, UserListData } =
    contactDataArrayParasm;

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
        placeholder: 'Enter First Name',
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
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'whatsAppNumber',
        label: 'WhatsApp Number',
        placeholder: 'Enter WhatsApp Number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select Owner',
        apiQuery: UserListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: {
          role: ROLES?.ORG_ADMIN,
        },
      },
      component: RHFAutocompleteAsync,
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
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        placeholder: 'Select Stage',
        apiQuery: lifeCycleStages,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'statusId',
        label: 'Status',
        placeholder: 'Select Status',
        apiQuery: contactsStatus,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
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
