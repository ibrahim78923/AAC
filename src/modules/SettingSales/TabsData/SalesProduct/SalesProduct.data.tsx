import { Checkbox, Switch } from '@mui/material';
import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const salesProductvalidationSchema = Yup.object().shape({
  productName: Yup.string().required('Field is Required'),
  SKU: Yup.string(),
  purchasePrice: Yup.string().required('Field is Required'),
  category: Yup.string(),
  description: Yup.string(),
  activeProduct: Yup.string(),
  unitPrice: Yup.string().required('Field is Required'),
  upload: Yup.string(),
});

export const salesProductDefaultValues = {
  productName: '',
  SKU: '',
  purchasePrice: '',
  category: '',
  description: '',
  activeProduct: '',
  unitPrice: '',
  upload: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'productName',
      label: 'Product Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'SKU',
      label: 'SKU',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'purchasePrice',
      label: 'Purchase Price',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
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
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'activeProduct',
      label: 'Active Product',
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
      name: 'unitPrice',
      label: 'Unit Price',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'upload',
      label: 'Upload',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

// table
export const SalesProductTableData: any = [
  {
    Id: 1,
    name: `Orcalo Holdings`,
    sku: '123412341',
    unitPrice: '563',
    purchasePrice: '563',
    createdBy: 'John Doe',
    createdDate: '12/01/2023',
    action: 'action',
  },
  {
    Id: 2,
    name: `Airapplecart`,
    sku: '76548709',
    unitPrice: '888',
    purchasePrice: '888',
    createdBy: 'Liever anderson',
    createdDate: '12/02/2023',
    action: 'action',
  },

  {
    Id: 3,
    name: `PPCN`,
    sku: '44 1234 567',
    unitPrice: '123',
    purchasePrice: '123',
    createdBy: 'Little Struit',
    createdDate: '23/12/2022',
    action: 'action',
  },
];

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
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
      accessorFn: (row: any) => row.sku,
      id: 'sku',
      isSortable: true,
      header: 'SKU',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.unitPrice,
      id: 'unitPrice',
      isSortable: true,
      header: 'Unit Price',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.purchasePrice,
      id: 'purchasePrice',
      isSortable: true,
      header: 'Purchase Price',
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
    {
      accessorFn: (row: any) => row.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => <Switch defaultChecked name={info.getValue()} />,
    },
  ];
};
