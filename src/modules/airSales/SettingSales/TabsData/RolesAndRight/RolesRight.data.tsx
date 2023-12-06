import { Checkbox } from '@mui/material';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  role: Yup.string().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  role: '',
  description: '',
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
      name: 'description',
      label: 'Description',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
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

export const permissionArr = [
  {
    id: '1',
    mainTitle: 'Deals',
    subModule: [
      {
        subTitle: 'Deals Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
          {
            label: 'View Dashboard',
          },
          {
            label: 'View Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    mainTitle: 'Tasks',
    subModule: [
      {
        subTitle: 'Tasks Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    mainTitle: 'Forecast',
    subModule: [
      {
        subTitle: 'Forecast Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
          {
            label: 'View Dashboard',
          },
          {
            label: 'View Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    mainTitle: 'Quotes',
    subModule: [
      {
        subTitle: 'Quotes Details',
        mainCheck: 'All',
        fetaures: [
          {
            label: 'Copy Url',
          },
          {
            label: 'Create Dashboard',
          },
          {
            label: 'Update Dashboard',
          },
          {
            label: 'View Dashboard',
          },
          {
            label: 'View Dashboard',
          },
        ],
      },
    ],
  },
];
