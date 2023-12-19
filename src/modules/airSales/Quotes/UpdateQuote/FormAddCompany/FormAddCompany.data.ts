import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Field is Required'),
});

export const initValues = {
  companyName: '',
  streetAddress: '',
  streetAddress2: '',
  city: '',
  postalCode: '',
  companyRegion: '',
  companyCountry: '',
};

export const addCompanyFields = [
  {
    id: 'companyName',
    component: RHFTextField,
    componentProps: {
      name: 'companyName',
      label: 'Sender Company Name',
      placeholder: 'Company Name',
    },
  },
  {
    id: 'streetAddress',
    component: RHFTextField,
    componentProps: {
      name: 'streetAddress',
      label: 'Sender Company Street Address',
      placeholder: 'Street Address',
    },
  },
  {
    id: 'streetAddress2',
    component: RHFTextField,
    componentProps: {
      name: 'streetAddress2',
      label: 'Sender Company Street Address 2',
      placeholder: 'Street Address 2',
    },
  },
  {
    id: 'city',
    component: RHFTextField,
    componentProps: {
      name: 'city',
      label: 'Sender Company City',
      placeholder: 'City',
    },
  },
  {
    id: 'postalCode',
    component: RHFTextField,
    componentProps: {
      name: 'postalCode',
      label: 'Sender Company Postal Code',
      placeholder: 'Postal Code',
    },
  },
  {
    id: 'companyRegion',
    component: RHFTextField,
    componentProps: {
      name: 'companyRegion',
      label: 'Sender Company State/Region',
      placeholder: 'Company State/Region',
    },
  },
  {
    id: 'companyCountry',
    component: RHFTextField,
    componentProps: {
      name: 'companyCountry',
      label: 'Sender Company Country',
      placeholder: 'Company Country',
    },
  },
];
