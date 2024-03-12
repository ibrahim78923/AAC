import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const contractsListsColumnsFunction = (
  selectedContractList: any,
  setSelectedContractList: any,
  mainContractsData: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedContractList?.find((item: any) => item === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedContractList([
                ...selectedContractList,
                info?.getValue(),
              ])
            : setSelectedContractList(
                selectedContractList?.filter(
                  (item: any) => item !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          mainContractsData?.length
            ? selectedContractList?.length === mainContractsData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedContractList(
                mainContractsData?.map((list: any) => list?._id),
              )
            : setSelectedContractList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: false,
    header: 'Contract Name',
    cell: (info: any) => (
      <Typography
        component="span"
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
        {info?.getValue()?.length > 30
          ? `${info?.getValue()?.slice?.(0, 29)} ... `
          : info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.contractType,
    id: 'contractType',
    header: 'Type',
    isSortable: false,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: false,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.renewalStatus,
    id: 'statusRenewExtend',
    isSortable: false,
    header: 'Renewal Status',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.contractNumber,
    id: 'contractNumber',
    isSortable: false,
    header: 'Contract Number',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.vendor,
    id: 'vendor',
    isSortable: false,
    header: 'Vendor',
    cell: (info: any) => info?.getValue()?.name ?? '---',
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'endDate',
    isSortable: false,
    header: 'Expiry Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
];
