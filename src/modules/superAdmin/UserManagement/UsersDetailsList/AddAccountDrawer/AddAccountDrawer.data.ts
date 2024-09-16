import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import useAddAccountDrawer from './useAddAccountDrawer';
import * as Yup from 'yup';
import { useLazyGetCompanyAccountsListsQuery } from '@/services/common-APIs';

export const AddAccountArray = (props: any) => {
  const { companyRoleParams, organizationBasesProducts, organizationId } =
    props;
  const { companyRoles } = useAddAccountDrawer();
  const companyAccounts = useLazyGetCompanyAccountsListsQuery();

  return [
    {
      componentProps: {
        label: 'Products',
        name: 'product',
        placeholder: 'Select Product',
        fullWidth: true,
        required: true,
        options: organizationBasesProducts?.map((item: any) => item),
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocomplete,
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
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: { orgId: organizationId, limit: 50 },
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
