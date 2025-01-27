import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addGiftCardValidationSchema = Yup?.object()?.shape({
  amount: Yup?.number()
    ?.typeError('Amount must be a number')
    ?.required('Amount is required'),
  recipient: Yup?.array()?.min(1, 'At least one recipient is required'),
  activeFrom: Yup?.mixed()?.nullable()?.required('Active from is required'),
  activeTo: Yup?.mixed()?.nullable()?.required('Active to is required'),
});

export const addGiftCardDefaultValues = {
  amount: null,
  recipient: [],
  activeFrom: null,
  activeTo: null,
};

export const addGiftCardFormFieldsDynamic = (
  apiQueryRecipient: any,
  activeFromValue: any,
) => [
  {
    _id: 1,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      placeholder: 'Enter Amount',
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      name: 'recipient',
      label: 'Recipient',
      placeholder: 'Select recipient',
      apiQuery: apiQueryRecipient,
      getOptionLabel: (option: any) =>
        `${option?.firstName}  ${option?.lastName}`,
      isOptionEqualToValue: (option: any, newValue: any) =>
        option?._id === newValue?._id,
      multiple: true,
    },
    component: RHFAutocompleteAsync,
  },
  {
    _id: 3,
    componentProps: {
      name: 'activeFrom',
      label: 'Active From',
      placeholder: 'Select Date',
      disablePast: true,
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    _id: 4,
    componentProps: {
      name: 'activeTo',
      label: 'Active To',
      placeholder: 'Select Date',
      minDate: activeFromValue,
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
];
