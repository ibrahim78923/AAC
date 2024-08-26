import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedContactFields = [
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
    component: RHFAutocomplete,
    md: 12,
    componentProps: {
      name: 'contactOwnerId',
      label: 'Contact Owner',
      placeholder: 'Select Owner',
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
    component: RHFAutocomplete,
    md: 12,
    componentProps: {
      name: 'lifeCycleStageId',
      label: 'Lifecycle Stage',
      placeholder: 'Select Lifecycle Stage',
    },
  },
  {
    id: 'statusId',
    component: RHFAutocomplete,
    md: 12,
    componentProps: {
      name: 'statusId',
      label: 'Status',
      placeholder: 'Select Status',
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

export const predefinedCompanyFields = [
  {
    componentProps: {
      name: 'domain',
      label: 'Company Domain Name (URL)',
      placeholder: 'Enter here',
      required: true,
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Company Name',
      placeholder: 'Company name',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      placeholder: 'Select company owner',
      name: 'ownerId',
      label: 'Company Owner',
      required: true,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'industry',
      label: 'Industry',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'computerSoftware', label: 'Computer software' },
      { value: 'computerServices', label: 'Computer Services' },
      { value: 'construction', label: 'Construction' },
      { value: 'none', label: 'None' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Company Type',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Partner', label: 'Partner' },
      { value: 'Vendor', label: 'Vendor' },
      { value: 'None', label: 'None' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'noOfEmloyee',
      label: 'No of Employees',
      placeholder: 'Enter here',
      fullWidth: true,
    },
    md: 12,
    component: RHFTextField,
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'totalRevenue',
      label: 'Total Revenue',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'city',
      label: 'City',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'address',
      label: 'Company Address',
      placeholder: 'Enter here',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter here',
      fullWidth: true,
      multiline: true,
      rows: 3,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn Company Page',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
];

export const predefinedFolderFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Folder Name',
      fullWidth: true,
      select: false,
      placeholder: 'Enter name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];

export const predefinedDocumentFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Folder Name',
      fullWidth: true,
      select: false,
      placeholder: 'Enter name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];

export const predefinedMeetingFields = [];
