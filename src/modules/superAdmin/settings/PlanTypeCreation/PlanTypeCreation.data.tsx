import { RHFTextField } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const planTypeCreationValidationSchema = Yup.object().shape({
  planTypeName: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const planTypeCreationDefaultValues = {
  planTypeName: '',
  description: '',
};

export const planTypeCreationFiltersDataArray = [
  {
    componentProps: {
      name: 'planTypeName',
      label: 'Plan Type Name',
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
    component: RHFTextField,
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
    accessorFn: (row: any) => row.planTypeName,
    id: 'planTypeName',
    cell: (info: any) => info.getValue(),
    header: 'Plan Type Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.description,
    id: 'description',
    isSortable: true,
    header: 'Discription',
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
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
