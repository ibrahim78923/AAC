import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
export const dummyOptions = ['helo', 'hello'];

export const generalTabData = [
  {
    id: 1,
    componentProps: {
      name: 'Company',
      label: 'Company',
      placeholder: 'placeholder',
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
      placeholder: 'placeholder',
    },
    component: RHFTextField,
    md: 5,
  },
  {
    id: 3,
    componentProps: {
      name: 'Industry',
      label: 'Industry',
      placeholder: 'placeholder',
      options: dummyOptions,
    },
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 34,
    componentProps: {
      name: 'Currency',
      label: 'Currency',
      placeholder: 'placeholder',
      options: dummyOptions,
    },
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 31,
    componentProps: {
      name: 'Language',
      label: 'Language',
      placeholder: 'placeholder',
      options: dummyOptions,
    },
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 33,
    componentProps: {
      name: 'Country',
      label: 'Country',
      placeholder: 'placeholder',
      options: dummyOptions,
    },
    component: RHFAutocomplete,
    md: 5,
  },
];
