import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const newsAndEventsDateValidationSchema = Yup.object().shape({
  createdDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
  type: Yup.string().trim().required('Field is Required'),
});

export const newsAndEventsDateDefaultValues = {
  createdDate: '',
  status: '',
  type: '',
};

export const newsAndEventsDateFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'inactive', label: 'inactive' },
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
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      select: true,
    },
    options: [
      { value: 'Event', label: 'Event' },
      { value: 'News', label: 'News' },
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
    accessorFn: (row: any) => row.name,
    id: 'name',
    cell: (info: any) => info.getValue(),
    header: 'Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'CreatedDate & Time',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
