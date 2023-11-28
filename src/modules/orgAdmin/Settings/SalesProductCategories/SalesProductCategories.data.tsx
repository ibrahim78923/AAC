import { Box, Checkbox } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import StatusBadge from '@/components/StatusBadge';
import { enqueueSnackbar } from 'notistack';

export const ProductCategoryvalidationSchema: any = Yup.object().shape({
  name: Yup.string()
    .required('Field is Required')
    .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed in this field'),
  description: Yup.string().required('Field is Required'),
});

export const ProductCategoryDefaultValues = {
  name: '',
  description: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
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
  setEditData: any,
  editData: any,
  updateSalesProductCategories: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={isGetRowValues?.includes(info?.row?.original?._id)}
          name={info?.getValue()}
          onClick={() => {
            const isChecked = isGetRowValues?.includes(
              info?.row?.original?._id,
            );
            if (!isChecked) {
              setIsGetRowValues((prev: any) => [
                ...prev,
                info?.row?.original?._id,
              ]);
            } else {
              setIsGetRowValues((prev: any) =>
                prev.filter((id: any) => id !== info?.row?.original?._id),
              );
            }
            setEditData(info?.row?.original);
            setIschecked(!isChecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info.getValue(),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => (
        <Box
          dangerouslySetInnerHTML={{ __html: info?.row?.original?.description }}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <StatusBadge
          value={info?.row?.original?.status}
          onChange={async (e: any) => {
            try {
              await updateSalesProductCategories({
                body: { status: e?.target?.value },
                id: info?.row?.original?._id,
              }).unwrap();

              enqueueSnackbar('Categories status Updated Successfully', {
                variant: 'success',
              });
            } catch (error: any) {
              enqueueSnackbar('Something went wrong !', { variant: 'error' });
            }
          }}
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
          defaultValue={''}
        />
      ),
    },
  ];
};
