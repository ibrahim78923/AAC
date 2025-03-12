import { TruncateText } from '@/components/TruncateText';
import { Typography } from '@mui/material';
import { splitCapitalizedWords } from '@/utils/api';
import { AIR_SERVICES } from '@/constants/routes';
import { uiDateFormat } from '@/lib/date-time';
import { tableCheckbox } from '@/utils/table-checkbox';

export const contractsListsColumnsFunction = (
  selectedContractList: any,
  setSelectedContractList: any,
  mainContractsData: any = [],
  router: any,
): any => [
  tableCheckbox({
    selectedList: selectedContractList,
    setSelectedList: setSelectedContractList,
    tableData: mainContractsData,
  }),
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: false,
    header: 'Contract Name',
    cell: (info: any) => (
      <Typography
        component="span"
        variant={'body3'}
        textTransform={'capitalize'}
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_CONTRACTS_DETAIL,
            query: {
              contractId: info?.row?.original?._id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        <TruncateText text={info?.getValue()?.toLowerCase()} />
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.contractTypeData?.name,
    id: 'contractTypeData.name',
    header: 'Type',
    isSortable: false,
    cell: (info: any) => (
      <Typography
        variant={'body3'}
        textTransform={'capitalize'}
        component={'span'}
      >
        <TruncateText text={info?.getValue()} />
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: false,
    header: 'Status',
    cell: (info: any) => (
      <Typography
        variant={'body3'}
        textTransform={'capitalize'}
        component={'span'}
      >
        {splitCapitalizedWords(info?.getValue()) ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.renewalStatus,
    id: 'statusRenewExtend',
    isSortable: false,
    header: 'Renewal Status',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.contractNumber,
    id: 'contractNumber',
    isSortable: false,
    header: 'Contract Number',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.vendor,
    id: 'vendor',
    isSortable: false,
    header: 'Vendor',
    cell: (info: any) => <TruncateText text={info?.getValue()?.name} />,
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'endDate',
    isSortable: false,
    header: 'Expiry Date',
    cell: (info: any) => uiDateFormat(info?.getValue()) ?? '---',
  },
];
