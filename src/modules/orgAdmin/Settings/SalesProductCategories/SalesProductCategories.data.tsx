import { Checkbox } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import StatusBadge from '@/components/StatusBadge';

export const ProductCategoryvalidationSchema = Yup.object().shape({
  ProductCategoryName: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required'),
});

export const ProductCategoryDefaultValues = {
  ProductCategoryName: '',
  description: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'ProductCategoryName',
      label: 'Product Category Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

// table
export const ProductCategoryTableData: any = [
  {
    Id: 1,
    name: `Hardware`,
    Description: 'John Doe',
    createdDate: '12/01/2023',
    action: 'action',
  },
  {
    Id: 2,
    name: `Setup`,
    Description: 'Liever anderson',
    createdDate: '12/02/2023',
    action: 'action',
  },

  {
    Id: 3,
    name: `Maintenance`,
    Description: 'Little Struit',
    createdDate: '23/12/2022',
    action: 'action',
  },
];

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
  userStatus: any,
  setUserStatus: any,
  theme: any,
) => {
  return [
    {
      accessorFn: (row: any) => row.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info.cell.row.original.Id ===
              isGetRowValues?.cell?.row?.original?.Id && ischecked
          }
          name={info.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIschecked(!ischecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.name,
      id: 'name',
      cell: (info: any) => info.getValue(),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row.Description,
      id: 'Description',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: () => (
        <StatusBadge
          value={userStatus}
          onChange={(e: any) => setUserStatus(e.target.value)}
          options={[
            {
              label: 'Active',
              value: 'active',
              color: theme?.palette?.success?.main,
            },
            {
              label: 'Inactive',
              value: 'inactive',
              color: theme?.palette?.error?.main,
            },
          ]}
        />
      ),
    },
  ];
};
