import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';

export const getFormFields = ({ orgId, contactOwner }: any) => [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'profilePicture',
      fullWidth: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: 1024 * 1024 * 2.44,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
  },
  {
    id: 3,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'John',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Doe',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 7,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'whatsAppNumber',
      label: 'WhatsApp Number',
      placeholder: 'WhatsApp Number',
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Job Title',
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'dateOfJoining',
      label: 'Date Of Joining',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 11,
    componentProps: {
      name: 'contactOwnerId',
      label: 'Contact Owner',
      placeholder: 'Select Owner',
      apiQuery: contactOwner,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      externalParams: { id: orgId, meta: false },
    },
    component: RHFAutocompleteAsync,
  },
];
