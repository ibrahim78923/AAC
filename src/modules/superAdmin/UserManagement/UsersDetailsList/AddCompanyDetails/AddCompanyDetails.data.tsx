import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  companyName: Yup.string().trim().required('Field is Required'),
  phoneNo: Yup.string().trim().required('Field is Required'),
  product: Yup.string().trim().required('Field is Required'),
  company: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  companyName: '',
  phoneNo: '',
  product: '',
  company: '',
};

export const dataArray = [
  {
    title: 'Company Name',
    componentProps: {
      placeholder: 'Enter Company Name',
      name: 'companyName',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Phone No',
    componentProps: {
      placeholder: 'Enter Number',
      name: 'phoneNo',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Product',
    componentProps: {
      name: 'product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'serviceCart', label: 'Service Cart' },
      { value: 'marketingCart', label: 'Marketing Cart' },
    ],
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
    options: [
      { value: 'orcaloHoldings', label: 'Orcalo Holdings' },
      { value: 'airAppleCart', label: 'Air applecart' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
