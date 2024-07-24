import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { useLazyGetCompanyAccountsListsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';
import * as Yup from 'yup';

export const addAccountsFormValidationSchema = Yup?.object()?.shape({
  companyAccountName: Yup?.object()?.required('Field is Required')?.nullable(),
  bankName: Yup?.string()
    .matches(/^[a-zA-Z\s]+$/, 'Bank name must contain only alphabets')
    ?.required('Field is Required'),
  accountHolder: Yup?.string()
    .matches(/^[a-zA-Z\s]+$/, 'Account holder must contain only alphabets')
    ?.required('Field is Required'),
  accountNumber: Yup?.string()
    .matches(/^[0-9]+$/, 'Account number must contain only numbers')
    ?.required('Field is Required'),
  sortCode: Yup?.string()
    .matches(/^[0-9]+$/, 'Sort code must contain only numbers')
    ?.required('Field is Required'),
});

export const addAccountsFormDefaultValues = {
  companyAccountName: null,
  bankName: '',
  accountHolder: '',
  accountNumber: '',
  sortCode: '',
};

export const addAccountsForm = () => {
  const { user }: any = getSession();

  const companyAccounts = useLazyGetCompanyAccountsListsQuery();
  return [
    {
      componentProps: {
        label: 'Company Account Name',
        name: 'companyAccountName',
        placeholder: 'Select Company Account',
        required: true,
        apiQuery: companyAccounts,
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: { orgId: user?.organization?._id },
        queryKey: 'ordId',
      },
      component: RHFAutocompleteAsync,
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
