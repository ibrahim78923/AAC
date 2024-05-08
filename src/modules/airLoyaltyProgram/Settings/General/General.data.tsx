import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
export const dummyOptions = ['option1', 'option2'];

export const generalFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'Company',
      label: 'Company',
      placeholder: 'Enter Company',
      disabled: true,
    },
    component: RHFTextField,
    md: 5,
  },
  {
    id: 2,
    componentProps: {
      name: 'Email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
      disabled: true,
    },
    component: RHFTextField,
    md: 5,
  },
  {
    id: 3,
    componentProps: {
      name: 'Industry',
      label: 'Industry',
      placeholder: 'Enter Industry',
      options: dummyOptions,
      disabled: true,
    },
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 34,
    componentProps: {
      name: 'Currency',
      label: 'Currency',
      placeholder: 'Enter currency',
      options: dummyOptions,
      disabled: true,
    },
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 31,
    componentProps: {
      name: 'Language',
      label: 'Language',
      placeholder: 'Enter language',
      options: dummyOptions,
      disabled: true,
    },
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 33,
    componentProps: {
      name: 'Country',
      label: 'Country',
      placeholder: 'Enter country',
      options: dummyOptions,
      disabled: true,
    },
    component: RHFAutocomplete,
    md: 5,
  },
];
