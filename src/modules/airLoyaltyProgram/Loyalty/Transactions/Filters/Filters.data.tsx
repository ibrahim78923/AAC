import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const jobTitleOptions = [
  'Senior HR Executive',
  'Software Engineer',
  'Software Developer',
];

export const filtersValidationSchema: any = Yup?.object()?.shape({
  shop: Yup?.string(),
  type: Yup?.string(),
  channel: Yup?.string(),
  credits: Yup?.string(),
});

export const filtersDefaultValues: any = {
  shop: '',
  type: '',
  channel: '',
  credits: '',
};

export const filtersArray = [
  {
    id: 1,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      placeholder: 'ABC',
      fullWidth: true,
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'type',
      label: 'Type',
      placeholder: 'ABC',
      fullWidth: true,
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'channel',
      label: 'Channel',
      placeholder: 'ABC',
      fullWidth: true,
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'credits',
      label: 'Credits',
      placeholder: '33',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
