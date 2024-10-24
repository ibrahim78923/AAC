import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';

export const contractColumns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Contract Name',
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        customTooltipProps={{ placement: 'top-start' }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.contractType,
    id: 'contractType',
    header: 'Type',
    isSortable: true,
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        customTooltipProps={{ placement: 'top-start' }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.renewalStatus,
    id: 'statusRenewExtend',
    isSortable: true,
    header: 'Renewal Status',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.contractNumber,
    id: 'contractNumber',
    isSortable: true,
    header: 'Contract Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'endDate',
    isSortable: true,
    header: 'Expiry',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
];
