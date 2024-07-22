import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const predefinedSoftwareDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter Description',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'status',
      label: 'Status',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'type',
      label: 'Type',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'category',
      label: 'Category',
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
    },
    component: RHFAutocomplete,
  },
];
