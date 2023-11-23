import { RHFSelect } from '@/components/ReactHookForm';
import useUserManagement from '../../useUserManagement';
import * as Yup from 'yup';

export const AddAccountArray = () => {
  const { products, organizations } = useUserManagement();
  return [
    {
      title: 'Products',
      componentProps: {
        name: 'products',
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
      title: 'Company',
      componentProps: {
        name: 'company',
        fullWidth: true,
        select: true,
      },
      options: organizations?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 12,
    },
    {
      title: 'Manage Role',
      componentProps: {
        name: 'manageRole',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'accountAdmin', label: 'Account Admin' },
        { value: 'administrator', label: 'Administrator' },
        { value: 'marketingManager', label: 'Marketing Manager' },
      ],
      component: RHFSelect,
      md: 6,
    },
    {
      title: 'Status',
      componentProps: {
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
