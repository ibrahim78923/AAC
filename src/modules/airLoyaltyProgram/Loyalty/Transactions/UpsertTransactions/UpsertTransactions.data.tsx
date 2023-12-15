import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const jobTitleOptions = [
  'Senior HR Executive',
  'Software Engineer',
  'Software Developer',
];

export const upsertTransactionsValidationSchema: any = Yup?.object()?.shape({
  email: Yup?.string(),
  shop: Yup?.string(),
  type: Yup?.string(),
  channel: Yup?.string(),
  points: Yup?.string(),
});

export const upsertTransactionsDefaultValues: any = {
  email: '',
  shop: '',
  type: '',
  channel: '',
  points: '',
};

export const upsertTransactionsArray = [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'usman@orcalo.co.uk',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      placeholder: 'ABC',
      fullWidth: true,
      options: jobTitleOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'type',
      label: 'Type',
      placeholder: 'ABC',
      fullWidth: true,
      options: jobTitleOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,

    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'channel',
      label: 'Channel',
      placeholder: 'ABC',
      fullWidth: true,
      options: jobTitleOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'points',
      label: 'Points',
      placeholder: '33',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
