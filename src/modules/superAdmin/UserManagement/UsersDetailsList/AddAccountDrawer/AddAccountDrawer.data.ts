import { RHFSelect } from '@/components/ReactHookForm';
import useUserManagement from '../../useUserManagement';
import * as Yup from 'yup';

export const AddAccountArray = (companyAccounts: any, companyRoles: any) => {
  const { products } = useUserManagement();
  return [
    {
      componentProps: {
        label: 'Products',
        name: 'product',
        required: true,
        fullWidth: true,
        select: true,
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
        required: true,
        select: true,
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
        name: 'role',
        required: true,
        fullWidth: true,
        select: true,
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
        required: true,
        name: 'status',
        fullWidth: true,
        select: true,
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
  product: Yup.string().required('Field is Required'),
  company: Yup.string().required('Field is Required'),
  role: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
});

export const AddAccountDefaultValues = {
  product: '',
  company: '',
  role: '',
  status: '',
};
