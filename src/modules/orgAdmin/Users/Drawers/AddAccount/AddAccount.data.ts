import { RHFSelect } from '@/components/ReactHookForm';
import useAddAccount from './useAddAccount';
import * as Yup from 'yup';
import useUsers from '../../useUsers';

export const AddAccountArray = (companyRoles: any) => {
  const { companyAccounts } = useAddAccount();
  const { user } = useUsers();

  return [
    {
      componentProps: {
        label: 'Products',
        name: 'product',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: user?.products?.map((item: any) => ({
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
        name: 'role',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: companyRoles?.data?.map((item: any) => ({
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
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'Inactive' },
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
