import Image from 'next/image';

import { Box, Checkbox } from '@mui/material';

import {
  RHFMultiSearchableSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { SalesIcon } from '@/assets/images';

export const productFeaturesValidationSchema = Yup.object().shape({
  product: Yup.array()
    .min(1, 'Field is Required')
    .max(10, 'Field is Required')
    .required('Field is Required'),
  productFeatureName: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const productFeaturesDefaultValues = {
  product: [],
  productFeatureName: '',
  description: '',
};
export const editProductFeaturesDefaultValues = {
  product: [],
  productFeatureName: 'asfasf',
  description: 'asfasf',
};

export const productFeaturesFiltersDataArray = [
  {
    md: 12,
    component: RHFMultiSearchableSelect,
    componentProps: {
      name: 'product',
      fullWidth: true,
      label: 'Product',
      isCheckBox: true,
      options: [
        { value: 'Sales', label: 'Sales' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Service', label: 'Service' },
        { value: 'Operations', label: 'Operations' },
        { value: 'Loyalty Program', label: 'Loyalty Program' },
      ],
    },
  },
  {
    componentProps: {
      name: 'productFeatureName',
      label: 'Product Feature Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      rows: 3,
    },
  },
];

export const columns = (
  isDisabled: boolean,
  setIsDisabled: any,
  tableRowValues: any,
  setTableRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?.Id ===
              tableRowValues?.cell?.row?.original?.Id && isDisabled
          }
          name={info.getValue()}
          onClick={() => {
            setTableRowValues(info), setIsDisabled(!isDisabled);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.productName,
      id: 'productName',
      cell: () => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: '500 !important',
          }}
        >
          <Image src={SalesIcon} alt="sales-icon" /> Sales
        </Box>
      ),
      header: 'Product Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.productFeatureName,
      id: 'productFeatureName',
      isSortable: true,
      header: 'Project Feature Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.description,
      id: 'description',
      isSortable: true,
      header: 'Category',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdBy,
      id: 'createdBy',
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
  ];
};
