import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import Search from '@/components/Search';

import sale from '../../../../assets/images/modules/organization/Featuredicon.png';
import sent from '../../../../assets/images/modules/organization/sent.png';
import service from '../../../../assets/images/modules/organization/service.png';

export const validationSchema = Yup.object().shape({
  accountName: Yup.string().required('Field is Required'),

  phoneNumber: Yup.string().trim().required('Field is Required'),

  postCode: Yup.string().trim().required('Field is Required'),

  address: Yup.string(),

  buildingName: Yup.string().required('Field is Required'),

  unit: Yup.string().required('Field is Required'),

  buildingNumber: Yup.string(),

  streetName: Yup.string(),

  city: Yup.string(),

  country: Yup.string(),
});

export const defaultValues = {
  accountName: '', //1

  phoneNumber: '', //2

  postCode: '', //3

  address: '', //4

  unit: '', //5

  buildingName: '', //6

  buildingNumber: '', //7

  streetName: '', //8

  city: '', //9

  country: '', //10
};

export const dataArray = [
  {
    componentProps: {
      name: 'accountName',
      label: 'Company Account Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone No',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
    },
    component: Search,
    md: 12,
  },
  {
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'unit',
      label: 'Flat/Unit',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'buildingName',
      label: 'Building Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'buildingNumber',
      label: 'Building Number',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'streetName',
      label: 'Street Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'city',
      label: 'Town/City',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,

    md: 12,
  },

  {
    componentProps: {
      name: 'country',
      label: 'Country',
      fullWidth: true,
      select: true,
    },
    options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
    component: RHFSelect,
    md: 12,
  },
];

export const productItem = [
  {
    id: '1',
    img: sale,
    name: 'Sales',
    color: '#4B5563',
    status: true,
  },
  {
    id: '2',
    img: sent,
    name: 'Marketing',
    color: '#9CA3AF',
    status: false,
  },
  {
    id: '3',
    img: service,
    name: 'Service',
    color: '#9CA3AF',
    status: false,
  },
];
