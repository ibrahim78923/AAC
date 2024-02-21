import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const newNumberValidationSchema = Yup.object().shape({
  country: Yup.string(),
  state: Yup.string(),
  digit: Yup.string(),
});

export const newNumberDefaultValues = {
  country: '',
  state: '',
  digit: '',
};

export const newNumberArray = [
  {
    componentProps: {
      name: 'country',
      label: 'Countries',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'us', label: 'US' },
      { value: 'uk', label: 'UK' },
      { value: 'pak', label: 'Pakistan' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'state',
      label: 'All States',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'us', label: 'US' },
      { value: 'uk', label: 'UK' },
      { value: 'pak', label: 'Pakistan' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'digit',
      fullWidth: true,
      placeholder: 'By digits',
    },
    component: RHFTextField,
    md: 12,
  },
];

// number detail array
export const numberDetails = [
  { no: '(267) 380 - 2781', state: 'Pennslyvania, US', ammount: '(£ 12.35)' },
  { no: '(267) 380 - 2783', state: 'Pennslyvania, UK', ammount: '(£ 22.95)' },
  { no: '(267) 380 - 2785', state: 'Pennslyvania, US', ammount: '(£ 2.45)' },
  { no: '(267) 380 - 2788', state: 'Pennslyvania, UK', ammount: '(£ 23.75)' },
  { no: '(267) 380 - 2794', state: 'Pennslyvania, US', ammount: '(£ 20.15)' },
];
