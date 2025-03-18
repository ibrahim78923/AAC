import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import useAddAccount from './useAddAccount';
import * as Yup from 'yup';
import { indexNumbers } from '@/constants';
import {
  useLazyGetCompanyAccountsListsQuery,
  useLazyGetUsersProductsListQuery,
} from '@/services/common-APIs';

export const AddAccountArray = (companyRoleParams: any, productValue: any) => {
  const { companyRoles, user } = useAddAccount();
  const products = useLazyGetUsersProductsListQuery();
  const companyAccounts = useLazyGetCompanyAccountsListsQuery();

  return [
    {
      componentProps: {
        label: 'Product',
        name: 'product',
        fullWidth: true,
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
        // externalParams: { status: PRODUCT_USER_STATUS?.active },
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        label: 'Company',
        name: 'company',
        placeholder: 'Select Company',
        fullWidth: true,
        required: true,
        apiQuery: companyAccounts,
        disabled: !productValue,
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: {
          orgId: user?.organization?._id,
          limit: 50,
          productId: productValue?._id,
        },
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        label: 'Manage Role',
        name: 'role',
        placeholder: 'Select Role',
        fullWidth: true,
        required: true,
        disabled: Object.keys(companyRoleParams)?.length === indexNumbers?.ZERO,
        apiQuery: companyRoles,
        getOptionLabel: (option: any) => option?.name,
        externalParams: companyRoleParams,
      },
      component: RHFAutocompleteAsync,
      md: 6,
    },
    {
      componentProps: {
        label: 'Status',
        name: 'status',
        placeholder: 'Select Status',
        fullWidth: true,
        required: true,
        options: ['ACTIVE', 'INACTIVE'],
      },
      component: RHFAutocomplete,
      md: 6,
    },
  ];
};
export const AddAccountValidationSchema: any = Yup.object().shape({
  product: Yup.object().required('Field is Required'),
  company: Yup.object().required('Field is Required'),
  role: Yup.object().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
});

export const AddAccountDefaultValues = {
  product: null,
  company: null,
  role: null,
  status: '',
};
