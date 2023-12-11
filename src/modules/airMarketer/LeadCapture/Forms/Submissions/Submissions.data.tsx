import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';

export const submissionsValidationSchema = Yup?.object()?.shape({
  Customer: Yup?.string()?.required('Field is Required'),
});

export const submissionsDefaultValues = {
  Customer: '',
};

export const submissionsArray = [
  {
    componentProps: {
      name: 'Customer',
      label: 'Customer',
      select: true,
    },
    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'Date Range',
      label: 'DateRange',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];

export const columns: any = () => {
  return [
    {
      accessorFn: (row: any) => row?.Customer,
      id: 'Customer',
      header: 'Customer',
      isSortable: true,
      cell: (info: any) => (
        <Typography variant="body4" sx={{ color: '#667085' }}>
          {info?.getValue()}{' '}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.SubmittedAt,
      id: 'SubmittedAt',
      isSortable: true,
      header: 'Submitted at',
      cell: (info: any) => (
        <Typography variant="body4" sx={{ color: '#6B7280' }}>
          {info?.getValue()}{' '}
        </Typography>
      ),
    },
  ];
};
