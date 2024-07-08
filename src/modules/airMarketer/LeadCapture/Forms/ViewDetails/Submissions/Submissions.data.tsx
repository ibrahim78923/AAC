import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

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
      accessorFn: (row: any) => row?.email,
      id: 'email',
      header: 'Email',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => {
        return <>{info?.getValue()}</>;
      },
    },
    {
      accessorFn: (row: any) => row?.domain,
      id: 'domain',
      isSortable: true,
      header: 'Domain',
      cell: (info: any) => {
        return <>{info?.getValue()}</>;
      },
    },
    {
      accessorFn: (row: any) => row?.submittedAt,
      id: 'submittedAt',
      isSortable: true,
      header: 'Submitted at',
      cell: (info: any) => {
        return <>{dayjs(info?.getValue()).format(DATE_FORMAT?.UI)}</>;
      },
    },
  ];
};
