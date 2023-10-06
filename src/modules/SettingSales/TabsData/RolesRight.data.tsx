import { Checkbox } from '@mui/material';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

// form Arr

export const validationSchema = Yup.object().shape({
  role: Yup.string().required('Field is Required'),

  desciption: Yup.string().trim().required('Field is Required'),

  // postCode: Yup.string().trim().required('Field is Required'),

  // address: Yup.string(),

  // buildingName: Yup.string().required('Field is Required'),

  // unit: Yup.string().required('Field is Required'),

  // buildingNumber: Yup.string(),

  // streetName: Yup.string(),

  // city: Yup.string(),

  // country: Yup.string(),
});

export const defaultValues = {
  role: '', //1

  desciption: '', //2

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
      name: 'role',
      label: 'Role',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanY Owner', label: 'Company Owner' },
      { value: 'Admin', label: 'Admin' },
    ],
    component: RHFSelect,
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
      name: 'deals',
      label: 'Deals',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanY Owner', label: 'All' },
      { value: 'Admin', label: 'Copy URL' },
      { value: 'Admin', label: 'Create Dashboard' },
      { value: 'Admin', label: 'Update Dashboard' },
      { value: 'Admin', label: 'View Dashboard' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'tasks',
      label: 'Tasks',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanY Owner', label: 'All' },
      { value: 'Admin', label: 'Copy URL' },
      { value: 'Admin', label: 'Create Dashboard' },
      { value: 'Admin', label: 'Update Dashboard' },
      { value: 'Admin', label: 'View Dashboard' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'forecast',
      label: 'Forecast',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanY Owner', label: 'All' },
      { value: 'Admin', label: 'Copy URL' },
      { value: 'Admin', label: 'Create Dashboard' },
      { value: 'Admin', label: 'Update Dashboard' },
      { value: 'Admin', label: 'View Dashboard' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'quotes',
      label: 'Quotes',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanY Owner', label: 'All' },
      { value: 'Admin', label: 'Copy URL' },
      { value: 'Admin', label: 'Create Dashboard' },
      { value: 'Admin', label: 'Update Dashboard' },
      { value: 'Admin', label: 'View Dashboard' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

// table
export const RolesAndRightTableData: any = [
  {
    Id: 1,
    roleId: `123`,
    roleName: 'User',
    createdOn: '12/10/2023',
    decription: 'This Role is of Xyz and will do this & that.',
  },
  {
    Id: 2,
    roleId: `456`,
    roleName: 'Accountant Admin',
    createdOn: '12/10/2023',
    decription: 'This Role is of Xyz and will do this & that.',
  },

  {
    Id: 3,
    roleId: `7899`,
    roleName: 'Admin',
    createdOn: '12/10/2023',
    decription: 'This Role is of Xyz and will do this & that.',
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
    accessorFn: (row: any) => row.roleId,
    id: 'roleId',
    cell: (info: any) => info.getValue(),
    header: 'Role ID',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.roleName,
    id: 'roleName',
    isSortable: true,
    header: 'Role Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdOn,
    id: 'createdOn',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.decription,
    id: 'decription',
    isSortable: true,
    header: 'Decription',
    cell: (info: any) => info.getValue(),
  },
];
