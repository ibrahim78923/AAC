import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { dynamicFormValidationSchema } from '@/utils/dynamic-forms';
import * as Yup from 'yup';

const phoneRegex = /^\+\d{1,3}[-.\s]?\d{10,}$/;

// Define your Yup validation schema
export const contactsValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    email: Yup?.string()?.email('Invalid email')?.required('Field is Required'),
    phoneNumber: Yup.string().nullable(),
    whatsAppNumber: Yup.string()
      .nullable()
      .test(
        'isValidWhatsAppNumber',
        'WhatsApp number is not valid',
        (value) => !value || phoneRegex.test(value),
      ),
    ...formSchema,
  });
};

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
  lifeCycleStageId: null,
  contactOwnerId: null,
  statusId: null,
  dateOfJoining: null,
  dateOfBirth: null,
};
export const contactsDataArray = (
  orgId: any,
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
        required: true,
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'profilePicture',
      componentProps: {
        name: 'profilePicture',
        label: 'Profile Picture',
        accept: {
          'image/png': ['.png', '.PNG'],
          'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
        },
        fileType: 'Only .jpeg and .png images will be accepted (max 2.44 MB).',
      },
      md: 12,
      component: RHFDropZone,
    },
    {
      id: 'firstName',
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter First Name',
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
        placeholder: 'Enter Last Name',
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
        placeholder: 'Enter Address',
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
        disableFuture: true,
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
        placeholder: 'Enter Phone ',
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
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'contactOwnerId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select Owner',
        apiQuery: contactOwnerData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
      },
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
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        placeholder: 'Select Lifecycle Stage',
        apiQuery: lifeCycleStagesData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {
          meta: false,
        },
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
        apiQuery: contactStatusData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {
          status: 'active',
        },
      },
    },
    {
      id: 'dateOfJoining',
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
