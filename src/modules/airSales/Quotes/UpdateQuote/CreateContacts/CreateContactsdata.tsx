import * as Yup from 'yup';
import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CONTACT_TYPE } from '@/constants';
import { ROLES } from '@/constants/strings';

// Define your Yup validation schema
export const contactsValidationSchema: any = Yup?.object()?.shape({
  chooseContact: Yup?.string()?.when(
    'contactType',
    ([contact]: any, field: any) =>
      contact !== CONTACT_TYPE?.NEW_CONTACT
        ? field?.required('Field is required')
        : field?.optional(),
  ),
  email: Yup.string().when('contactType', ([contact]: any, field: any) =>
    contact === CONTACT_TYPE.NEW_CONTACT
      ? field.required('Field is required')
      : field.optional(),
  ),
});

// Define your default values
export const contactsDefaultValues = {
  contactType: 'new-contact',
  email: '',
  dateOfBirth: null,
  dateOfJoining: null,
};

export const contactsDataArray = (contactDataArrayParasm: any) => {
  const { contactsStatus, lifeCycleStages, UserListData } =
    contactDataArrayParasm;

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
        placeholder: 'MM/DD/YYYY',
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
        placeholder: 'Enter Number',
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
      id: 'lifeCycleStageId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        placeholder: 'Select Lifecycle Stage',
        apiQuery: lifeCycleStages,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
      },
    },
    {
      id: 'statusId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'statusId',
        label: 'Status',
        placeholder: 'Select Status',
        apiQuery: contactsStatus,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
      },
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
  view: 'View Contacts',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};

export const contactOptions = [
  {
    label: 'New Contact',
    value: 'new-contact',
  },
  {
    label: 'Existing Contact',
    value: 'existing-contact',
  },
];
