import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';

import * as Yup from 'yup';
export const quickLinksFilterValidationSchema = Yup.object().shape({
  candidates: Yup.string().trim().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const quickLinksFilterDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const quickLinksFilterFiltersDataArray = [
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'candidates',
      label: 'Candidates',
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.product,
    id: 'product',
    cell: (info: any) => info.getValue(),
    header: 'Product',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.moduleName,
    id: 'moduleName',
    isSortable: true,
    header: 'Module/Sub Module Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created at',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.url,
    id: 'url',
    isSortable: true,
    header: 'URL',
    cell: (info: any) => info.getValue(),
  },
];
