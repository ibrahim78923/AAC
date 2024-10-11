import {
  RHFAutocomplete,
  RHFDateRangePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addGiftCardValidationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.trim()?.required('Required'),
  recipient: Yup?.mixed()?.nullable()?.required('Required'),
});

export const addGiftCardDefaultValues = {
  amount: '',
  recipient: null,
  dateRange: {
    startDate: null,
    endDate: null,
    key: 'selection',
  },
};

export const addGiftCardFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      required: true,
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
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select Date',
    },
    component: RHFDateRangePicker,
    md: 12,
  },
];
