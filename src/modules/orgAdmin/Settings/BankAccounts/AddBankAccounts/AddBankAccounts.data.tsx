import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addAccountsFormValidationSchema = Yup.object().shape({
  // validation commented for future use
  companyAccountName: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, 'Company account name must contain only alphabets')
    .required('Field is Required'),
  bankName: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, 'Bank name must contain only alphabets')
    .required('Field is Required'),
  accountHolder: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, 'Account holder must contain only alphabets')
    .required('Field is Required'),
  accountNumber: Yup.string()
    // .matches(/^[0-9]+$/, 'Account number must contain only numbers')
    .required('Field is Required'),
  sortCode: Yup.string()
    // .matches(/^[0-9]+$/, 'Sort code must contain only numbers')
    .required('Field is Required'),
});

export const addAccountsFormDefaultValues = {
  companyAccountName: '',
  bankName: '',
  accountHolder: '',
  accountNumber: '',
  sortCode: '',
};

export const addAccountsForm = (companyAccounts: any) => {
  return [
    {
      componentProps: {
        name: 'companyAccountName',
        label: 'Company Account name',
        placeholder: 'Blling Frequency',
        required: true,
        fullWidth: true,
        select: true,
      },
      options: companyAccounts?.data?.organizationcompanyaccounts?.map(
        (item: any) => ({
          // item?._id
          value: item?.accountName,
          label: item?.accountName,
        }),
      ),
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
};
