import * as Yup from 'yup';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

//filter drwaer form
export const validationSchema = Yup.object().shape({
  roleName: Yup.string().required('Field is Required'),
  product: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
  createdDate: Yup.date().required('Field is Required'),
});

export const defaultValues = {
  roleName: '', //1
  product: '',
  status: '',
  createdDate: new Date(),
};

export const rolesFiltersArray = [
  {
    componentProps: {
      name: 'roleName',
      label: 'Role Name',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanyOwner', label: 'Company Owner' },
      { value: 'SuperAdmin', label: 'Super Admin' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'product',
      label: 'Product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'sales', label: 'Sales' },
      { value: 'services', label: 'Services' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'loyaltyProgram', label: 'Loyalty Progrma' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
