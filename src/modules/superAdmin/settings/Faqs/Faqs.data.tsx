import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const faqsFilterValidationSchema = Yup.object().shape({
  candidates: Yup.string().trim().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const faqsFilterDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const faqsFilterFiltersDataArray = [
  {
    componentProps: {
      name: 'category',
      label: 'Category',
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
  {
    componentProps: {
      name: 'createdBy',
      label: 'createdBy',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'William', label: 'William' },
      { value: 'Andrew', label: 'Andrew' },
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
    accessorFn: (row: any) => row.question,
    id: 'question',
    cell: (info: any) => info.getValue(),
    header: 'Question',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.faqCategory,
    id: 'faqCategory',
    isSortable: true,
    header: 'FAQ Category',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.answer,
    id: 'answer',
    isSortable: true,
    header: 'Answer',
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
