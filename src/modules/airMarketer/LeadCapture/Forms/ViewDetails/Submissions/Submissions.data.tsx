import {
  RHFAutocompleteAsync,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const submissionsArray = (customers: any, formId: string) => [
  {
    componentProps: {
      name: 'customer',
      label: 'Customer',
      placeholder: 'Select Customer',
      apiQuery: customers,
      getOptionLabel: (option: any) => option?.email,
      externalParams: {
        id: formId,
      },
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];

export const columns: any = () => {
  return [
    {
      accessorFn: (row: any) => row?.submission?.email,
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
