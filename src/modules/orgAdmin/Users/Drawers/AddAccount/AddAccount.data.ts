import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import useAddAccount from './useAddAccount';
export const AddAccountArray = () => {
  const { products, companyAccounts, companyRoles } = useAddAccount();
  return [
    {
      componentProps: {
        label: 'Products',
        name: 'products',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: products?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        label: 'Company',
        name: 'company',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: companyAccounts?.data?.organizationcompanyaccounts?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.accountName,
        }),
      ),
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        label: 'Manage Role',
        name: 'manageRole',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: companyRoles?.data.companyaccountroles?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 6,
    },
    {
      componentProps: {
        label: 'Status',
        name: 'status',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      component: RHFSelect,
      md: 6,
    },
  ];
};
export const AddAccountValidationSchema = Yup.object().shape({
  products: Yup.string().required('Field is Required'),
  company: Yup.string().required('Field is Required'),
  manageRole: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
});

export const AddAccountDefaultValues = {
  products: '',
  company: '',
  manageRole: '',
  status: '',
};
