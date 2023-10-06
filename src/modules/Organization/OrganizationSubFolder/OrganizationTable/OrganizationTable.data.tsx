import { Checkbox, Switch } from '@mui/material';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import Search from '@/components/Search';

export const BillingAndInvoicesTableData: any = [
  {
    Id: 1,
    companyAccount: `Orcalo Holdings`,
    products: 'Draftstrtr',
    phoneNo: 'Sharemydine',
    address: 'Alee',
    status: 'Tech Support',
  },
  {
    Id: 2,
    companyAccount: ` Apple AirCart`,
    products: 'Draftstrtr',
    phoneNo: 'Sharemydine',
    address: 'Alee',
    status: 'Tech Support',
  },

  {
    Id: 3,
    companyAccount: `PPCN`,
    products: 'Draftstrtr',
    phoneNo: 'Sharemydine',
    address: 'Alee',
    status: 'Tech Support',
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.companyAccount,
    id: 'companyAccount',
    cell: (info: any) => info.getValue(),
    header: 'Company Account',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.phoneNo,
    id: 'phoneNo',
    isSortable: true,
    header: 'Phone No',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => <Switch color="primary" name={info.getValue()} />,
  },
];
// form Arr

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
