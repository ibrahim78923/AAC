import { RHFSelect } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const enquiriesFiltersValidationSchema = Yup.object().shape({
  candidates: Yup.string().trim().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const enquiriesFiltersDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const enquiriesFiltersFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'Done', label: 'Done' },
      { value: 'Pending', label: 'Pending' },
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
    accessorFn: (row: any) => row.companyName,
    id: 'companyName',
    isSortable: true,
    header: 'Company Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.comments,
    id: 'comments',
    isSortable: true,
    header: 'Comments',
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
