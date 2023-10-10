import * as Yup from 'yup';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

//filter drwaer form
export const validationSchema = Yup.object().shape({
  userType: Yup.string().required('Field is Required'),
  organiztaionName: Yup.string().required('Field is Required'),
  product: Yup.string().required('Field is Required'),
  createdDate: Yup.date().required('Field is Required'),
});

export const defaultValues = {
  userType: '', //1
  organiztaionName: '',
  product: '',
  createdDate: new Date(),
};

export const filtersArray = [
  {
    componentProps: {
      name: 'userType',
      label: 'User Type',
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
      name: 'organiztaionName',
      label: 'Organization Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'product',
      label: 'Product',
      fullWidth: true,
    },
    component: RHFTextField,
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
