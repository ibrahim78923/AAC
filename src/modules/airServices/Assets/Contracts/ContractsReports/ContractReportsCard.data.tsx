import { TruncateText } from '@/components/TruncateText';
import { CONTRACT_REPORT_STATUS } from '@/constants/services';
import { uiDateFormat } from '@/lib/date-time';

export const ContractReportsCountData = (data: any) => {
  return {
    [CONTRACT_REPORT_STATUS?.ALL]: data?.allContract,
    [CONTRACT_REPORT_STATUS?.LEASE]: data?.lease,
    [CONTRACT_REPORT_STATUS?.MAINTENANCE]: data?.maintenance,
    [CONTRACT_REPORT_STATUS?.SOFTWARE]: data?.softwareLicence,
    [CONTRACT_REPORT_STATUS?.WARRANTY]: data?.warranty,
  };
};

export const ContractReportsChartData = (data: any) => {
  return {
    [CONTRACT_REPORT_STATUS?.LEASE]: data?.lease,
    [CONTRACT_REPORT_STATUS?.MAINTENANCE]: data?.maintenance,
    [CONTRACT_REPORT_STATUS?.SOFTWARE]: data?.softwareLicence,
    [CONTRACT_REPORT_STATUS?.WARRANTY]: data?.warranty,
  };
};

export const contractsTypeOptions = [
  {
    _id: 'allContract',
    label: [CONTRACT_REPORT_STATUS?.ALL],
  },
  {
    _id: 'lease',
    label: [CONTRACT_REPORT_STATUS?.LEASE],
  },
  {
    _id: 'maintenance',
    label: [CONTRACT_REPORT_STATUS?.MAINTENANCE],
  },
  {
    _id: 'softwareLicence',
    label: [CONTRACT_REPORT_STATUS?.SOFTWARE],
  },
  {
    _id: 'warranty',
    label: [CONTRACT_REPORT_STATUS?.WARRANTY],
  },
];

export const contractReportsTableColumns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Contract Name',
    isSortable: false,
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: false,
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.contractTypeDetails?.name,
    id: 'type',
    header: 'Type',
    isSortable: false,
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'expirydate',
    header: 'Expiry Date',
    isSortable: false,
    cell: (info: any) => uiDateFormat(info?.getValue()) ?? '---',
  },
];
