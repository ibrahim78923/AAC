import { Checkbox } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

import { RHFTextField } from '@/components/ReactHookForm';

import { ExpandMore } from '@mui/icons-material';

import { SwitchBtn } from '@/components/SwitchButton';

import * as Yup from 'yup';

export const data: any = [
  {
    id: 1,
    campaignName: `Campaign Name`,
    compareOwner: 'Campaign Owner',
    compareBugets: '120.31.00',
    campaignComments: 0,
    startDate: '10/04/2023',
    endDate: '10/04/2023',
    campaignStatus: 'Active',
  },
  {
    id: 2,
    campaignName: `Campaign Name`,
    compareOwner: 'Campaign Owner',
    compareBugets: '120.31.00',
    campaignComments: 0,
    startDate: '10/04/2023',
    endDate: '10/04/2023',
    campaignStatus: 'Active',
  },
  {
    id: 3,
    campaignName: `Campaign Name`,
    compareOwner: 'Campaign Owner',
    compareBugets: '120.31.00',
    campaignComments: 0,
    startDate: '10/04/2023',
    endDate: '10/04/2023',
    campaignStatus: 'Active',
  },
  {
    id: 4,
    campaignName: `Campaign Name`,
    compareOwner: 'Campaign Owner',
    compareBugets: '120.31.00',
    campaignComments: 0,
    startDate: '10/04/2023',
    endDate: '10/04/2023',
    campaignStatus: 'Active',
  },
  {
    id: 5,
    campaignName: `Campaign Name`,
    compareOwner: 'Campaign Owner',
    compareBugets: '120.31.00',
    campaignComments: 0,
    startDate: '10/04/2023',
    endDate: '10/04/2023',
    campaignStatus: 'Active',
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.campaignName,
    id: 'campaignName',
    cell: (info: any) => info?.getValue(),
    header: 'Campaign Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.compareOwner,
    id: 'compareOwner',
    isSortable: true,
    header: 'Campaign Owner',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.compareBugets,
    id: 'compareBudget',
    isSortable: true,
    header: 'Campaign Budget',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.campaignComments,
    id: 'campaignComments',
    isSortable: true,
    header: 'Campaign Comments',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.startDate,
    id: 'startDate',
    isSortable: true,
    header: 'Start Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'endDate',
    isSortable: true,
    header: 'End Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.campaignStatus,
    id: 'campaignStatus',
    isSortable: true,
    header: 'Campaign Status',
    cell: (info: any) => info?.getValue(),
  },
];

export const rolesValidationSchema = Yup?.object()?.shape({
  roleName: Yup?.string()?.required('Field is Required'),
  product: Yup?.string()?.required('Field is Required'),
  status: Yup?.string()?.required('Field is Required'),
  createdDate: Yup?.date()?.required('Field is Required'),
});

export const rolesDefaultValues = {
  roleName: '',
  product: '',
  status: '',
  createdDate: null,
};

export const rolesFiltersArray = [
  {
    title: 'Role Name',
    componentProps: {
      name: 'roleName',
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
    title: 'Product',
    componentProps: {
      name: 'product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'sales', label: 'Sales' },
      { value: 'services', label: 'Services' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'loyaltyProgram', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
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
    md: 12,
  },

  {
    title: 'Created Date',
    componentProps: {
      name: 'createdDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];

export const addUserSchema = Yup?.object()?.shape({
  roleName: Yup?.string()?.required('Field is Required'),
  productType: Yup?.string()?.required('Field is Required'),
  defaultUser: Yup?.string()?.required('Field is Required'),
  desc: Yup?.string()?.required('Field is Required'),
});

export const addUserDefault = {
  roleName: '',
  productType: '',
  defaultUser: '',
  desc: '',
};

export const addUsersArrayData = [
  {
    title: 'Role Name',
    componentProps: {
      name: 'roleName',
      placeholder: 'Enter Role Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 5,
  },

  {
    title: 'Select Product',
    componentProps: {
      name: 'productType',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'airSale', label: 'Air Sale' },
      { value: 'airMarketer', label: 'Air Marketer' },
      { value: 'airServices', label: 'Air Services' },
      { value: 'orgAdmin', label: 'Org Admin' },
      { value: 'loyalty', label: 'Loyalty' },
    ],
    component: RHFSelect,
    md: 5,
  },

  {
    componentProps: {
      name: 'defaultUser',
      label: 'Default User',
      fullWidth: true,
    },
    component: SwitchBtn,
    md: 5,
  },

  {
    title: 'Description',
    componentProps: {
      name: 'desc',
      placeholder: 'Description',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 5,
  },
];

export const accData = [
  {
    title: 'Dashboard',
    hasSwitch: true,
    content: 'Dashboard content here',
    endIcon: <ExpandMore />,
  },
  {
    title: 'Deals',
    hasSwitch: true,
    content: 'Deals content here',
    endIcon: <ExpandMore />,
  },
];
