import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const newNumberValidationSchema = Yup.object().shape({
  country: Yup.string(),
  state: Yup.string(),
  digit: Yup.string(),
});

export const newNumberDefaultValues = {
  country: 'UK',
  state: '',
  digit: '',
};

export const newNumberArray = [
  {
    componentProps: {
      name: 'formType',
      label: 'Local',
      fullWidth: true,
    },
    component: RHFSwitch,
    isNumberDatils: [false],
    md: 12,
  },
  {
    componentProps: {
      name: 'country',
      label: 'Countries',
      fullWidth: true,
    },
    component: RHFTextField,
    isNumberDatils: [false],
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
    isNumberDatils: [false],
    md: 12,
  },
  {
    componentProps: {
      name: 'digit',
      fullWidth: true,
      placeholder: 'By digits',
    },
    component: RHFTextField,
    isNumberDatils: [false],
    md: 12,
  },
  {
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Company Name',
    },
    component: RHFTextField,
    isNumberDatils: [true],
    md: 12,
  },
  {
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Postal Code',
    },
    component: RHFTextField,
    isNumberDatils: [true],
    md: 12,
  },
  {
    componentProps: {
      name: 'compositeAddress',
      label: 'Address',
      required: true,
      fullWidth: true,
      placeholder: 'Enter Address',
    },
    component: RHFTextField,
    isNumberDatils: [true],
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
