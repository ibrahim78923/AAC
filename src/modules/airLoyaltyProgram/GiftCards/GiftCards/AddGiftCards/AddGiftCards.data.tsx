import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addGiftCardValidationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.trim()?.required('Amount is Required'),
  recipient: Yup?.mixed()?.nullable()?.required('Recipient is Required'),
  activeFrom: Yup?.mixed()?.nullable()?.required('Active From is Required'),
  activeTo: Yup?.mixed()?.nullable()?.required('Active From is Required'),
});

export const addGiftCardDefaultValues = {
  amount: '',
  recipient: null,
  activeFrom: null,
  activeTo: null,
};

export const addGiftCardFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      placeholder: 'Enter Amount',
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'recipient',
      label: 'Recipient',
      placeholder: 'Select recipient',
      fullWidth: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'activeFrom',
      label: 'Active From',
      placeholder: 'Select Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 3,
    componentProps: {
      name: 'activeTo',
      label: 'Active To',
      placeholder: 'Select Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
];
