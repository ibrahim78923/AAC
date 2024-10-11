import { Checkbox } from '@mui/material';
import { RHFTextField, RHFAutocompleteAsync } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import useProductFeature from './useProductFeature';
import StatusBadge from '@/components/StatusBadge';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS } from '@/constants/permission-keys';

export const productFeaturesValidationSchema = Yup.object().shape({
  productIds: Yup.array()
    .min(1, 'Field is Required')
    .max(10, 'Field is Required')
    .required('Field is Required'),
  name: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});
export const addProductFeatureFormDefaultValues = {
  productIds: [],
  name: '',
  description: '',
};

export const addProductFeatureFormData = (products: any) => {
  return [
    {
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'productIds',
        label: 'Product',
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
        required: true,
        multiple: true,
      },
    },
    {
      componentProps: {
        name: 'name',
        label: 'Product Feature Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        placeholder: 'Description',
        multiline: true,
        rows: 3,
        required: true,
      },
    },
  ];
};

export const columns = (setRowId: any, rowId: any, theme: any) => {
  const { handleUpdateStatus } = useProductFeature();
  const handleRowSelect = (id: any) => {
    const isSelected = rowId === id;
    const newSelected = isSelected ? null : id;
    setRowId(newSelected);
  };
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={rowId === info?.cell?.row?.original?._id}
          name={info?.cell?.row?.original?._id}
          onClick={() => {
            handleRowSelect(info?.cell?.row?.original?._id);
          }}
        />
      ),
      header: <></>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.productName,
      id: 'productName',
      cell: (info: any) => info?.getValue(),
      header: 'Product Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Project Feature Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Category',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        return (
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS?.Active_Inactive_Features,
            ]}
          >
            <StatusBadge
              key={info?.row?.original?._id}
              value={info?.row?.original?.status}
              onChange={(e: any) => {
                handleUpdateStatus(e?.target?.value, info?.row?.original?._id);
              }}
              options={[
                {
                  label: 'Active',
                  value: 'active',
                  color: theme?.palette?.custom?.bluish_gray,
                },
                {
                  label: 'Inactive',
                  value: 'inactive',
                  color: theme?.palette?.error?.main,
                },
              ]}
            />
          </PermissionsGuard>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue()?.name,
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT.UI),
    },
  ];
};

export const editFeatureValidationSchema = Yup.object().shape({
  productId: Yup.mixed().nullable().required('Field is Required'),
  name: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const editFeatureFormDefaultValues = {
  productId: {},
  name: '',
  description: '',
};

export const editProductFeatureFormData = (products: any) => {
  return [
    {
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'productId',
        label: 'Product',
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { status: 'active' },
        required: true,
      },
    },
    {
      componentProps: {
        name: 'name',
        label: 'Product Feature Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        placeholder: 'Description',
        multiline: true,
        rows: 3,
        required: true,
      },
    },
  ];
};
