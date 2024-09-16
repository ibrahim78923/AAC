import { Box, Checkbox } from '@mui/material';
import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import StatusBadge from '@/components/StatusBadge';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import {
  ColumnsFunctionParams,
  ColumnsFunctionReturnType,
  DataArrayItem,
  ProductCategoryDefaultValI,
} from './SalesProductCategories.interface';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const ProductCategoryvalidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  description: Yup?.string(),
});

export const ProductCategoryDefaultValues: ProductCategoryDefaultValI = {
  name: '',
  description: '',
};

export const dataArray: DataArrayItem[] = [
  {
    componentProps: {
      name: 'name',
      label: 'Product Category Name',
      placeholder: 'Enter product name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description...',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const columns = ({
  setIsGetRowValues,
  setIsChecked,
  isGetRowValues,
  theme,
  setEditData,
  updateSalesProductCategories,
}: ColumnsFunctionParams): ColumnsFunctionReturnType => {
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
              setIsGetRowValues(
                (prev: any) =>
                  prev?.filter((id: any) => id !== info?.row?.original?._id),
              );
            }
            setEditData(info?.row?.original);
            setIsChecked(!isChecked);
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
      cell: (info: any) => {
        return (
          <Box
            dangerouslySetInnerHTML={{ __html: info?.getValue() ?? 'N/A' }}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <StatusBadge
          value={info?.row?.original?.status}
          onChange={(e: any) => {
            updateSalesProductCategories({
              body: { status: e?.target?.value },
              id: info?.row?.original?._id,
            })
              ?.then(() => {
                enqueueSnackbar('Categories status Updated Successfully', {
                  variant: NOTISTACK_VARIANTS?.SUCCESS,
                });
              })
              ?.catch((error: any) => {
                enqueueSnackbar(error, { variant: NOTISTACK_VARIANTS?.ERROR });
              });
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
        />
      ),
    },
  ];
};
