import { DATE_FORMAT } from '@/constants';
import { truncateText } from '@/utils/avatarUtils';
import dayjs from 'dayjs';

export const ContractReportsCardData = (data: any) => {
  return {
    All: data?.allContract,
    Lease: data?.lease,
    Maintenance: data?.maintenance,
    Software: data?.softwareLicence,
    Warranty: data?.warranty,
  };
};
export const ContractReportsChartData = (data: any) => {
  return {
    All: data?.allContract,
    Lease: data?.lease,
    Maintenance: data?.maintenance,
    Software: data?.softwareLicence,
    Warranty: data?.warranty,
  };
};
export const chartOptions: any = [
  'All',
  'Lease',
  'Maintenance',
  'Software',
  'Warranty',
];

export const contractsTypeOptions = [
  {
    _id: 'allContract',
    label: 'All',
  },
  {
    _id: 'lease',
    label: 'Lease',
  },
  {
    _id: 'maintenance',
    label: 'Maintenance',
  },
  {
    _id: 'softwareLicence',
    label: 'Software',
  },
  {
    _id: 'warranty',
    label: 'Warranty',
  },
];

export const contractReportsTableData = [
  {
    name: 'Freshsevice',
    type: '',
    status: '',
    expirydate: '',
  },
  {
    name: 'Microsoft Office 365',
    status: '',
    type: '',
    expirydate: '',
  },
];
export const contractReportsTabelCoulmns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => truncateText(info?.getValue()),
    header: 'Contract Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    cell: (info: any) => info?.getValue() ?? '---',
    header: 'Status',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.contractTypeDetails?.name,
    id: 'type',
    cell: (info: any) => info?.getValue() ?? '---',
    header: 'Type',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'expirydate',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? '---',
    header: 'Expiry Date',
    isSortable: false,
  },
];
