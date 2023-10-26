import { Checkbox } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

import { RHFTextField } from '@/components/ReactHookForm';

import { ExpandMore } from '@mui/icons-material';

import { SwitchBtn } from '../SwitchButton';

import * as Yup from 'yup';

export const data: any = [
  {
    Id: 1,
    RoleId: `123`,
    RoleName: 'Company Owner',
    Products: 'Sales',
    Status: <SwitchBtn defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 2,
    RoleId: `456`,
    RoleName: 'Company Owner',
    Products: 'Services',
    Status: <SwitchBtn defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 3,
    RoleId: `789`,
    RoleName: 'Admin',
    Products: 'Marketing',
    Status: <SwitchBtn defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 4,
    RoleId: `752`,
    RoleName: 'Admin',
    Products: 'Loyalty Program',
    Status: <SwitchBtn defaultChecked />,
    CreatedOn: '12/10/2023',
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
    accessorFn: (row: any) => row.RoleId,
    id: 'roleId',
    cell: (info: any) => info.getValue(),
    header: 'Role ID',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.RoleName,
    id: 'roleName',
    isSortable: true,
    header: 'Role Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.CreatedOn,
    id: 'createdOn',
    isSortable: true,
    header: 'CreatedOn',
    cell: (info: any) => info.getValue(),
  },
];

export const rolesValidationSchema = Yup.object().shape({
  roleName: Yup.string().required('Field is Required'),
  product: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
  createdDate: Yup.date().required('Field is Required'),
});

export const rolesDefaultValues = {
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

export const addUserSchema = Yup.object().shape({
  roleName: Yup.string().required('Field is Required'),
  productType: Yup.string().required('Field is Required'),
  defaultUser: Yup.string().required('Field is Required'),
  desc: Yup.string().required('Field is Required'),
});

export const addUserDefault = {
  roleName: '',
  productType: '',
  defaultUser: '',
  desc: '',
};

export const addUsersArrayData = [
  {
    componentProps: {
      name: 'roleName',
      label: 'Role Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 5,
  },

  {
    componentProps: {
      name: 'productType',
      label: 'Select Product',
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
    component: RHFTextField,
    md: 5,
  },

  {
    componentProps: {
      name: 'desc',
      label: 'Description',
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
