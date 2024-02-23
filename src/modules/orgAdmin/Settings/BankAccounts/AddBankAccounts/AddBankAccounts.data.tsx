import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addAccountsFormValidationSchema = Yup.object().shape({
  companyAccountName: Yup.string().required('Field is Required'),
  bankName: Yup.string().required('Field is Required'),
  accountHolder: Yup.string().required('Field is Required'),
  accountNumber: Yup.string().required('Field is Required'),
  sortCode: Yup.string().required('Field is Required'),
});

export const addAccountsFormDefaultValues = {
  companyAccountName: '',
  bankName: '',
  accountHolder: '',
  accountNumber: '',
  sortCode: '',
};

export const addAccountsForm = [
  {
    componentProps: {
      name: 'companyAccountName',
      label: 'Company Account name',
      placeholder: 'Blling Frequency',
      required: true,
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'semiannually', label: 'Semi-annually' },
      { value: 'Annually', label: 'Desing' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'bankName',
      label: 'Bank Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Bank Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'accountHolder',
      label: 'Account Holder',
      placeholder: 'Enter Account Holder',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'accountNumber',
      label: 'Account Number',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Account Number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'sortCode',
      label: 'Sort Code',
      placeholder: '------',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
