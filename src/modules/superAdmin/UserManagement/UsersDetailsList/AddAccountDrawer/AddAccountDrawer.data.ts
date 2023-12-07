import { RHFSelect } from '@/components/ReactHookForm';
import useUserManagement from '../../useUserManagement';
import * as Yup from 'yup';

export const AddAccountArray = () => {
  const { products, organizations } = useUserManagement();
  return [
    {
      componentProps: {
        label: 'Products',
        name: 'products',
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
      options: organizations?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        label: 'Manage Role',
        name: 'manageRole',
        required: true,
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
