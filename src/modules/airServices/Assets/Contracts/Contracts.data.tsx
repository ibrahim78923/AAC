import { AIR_SERVICES } from '@/constants';
import { Checkbox, Typography } from '@mui/material';

export const data: any = [
  {
    id: 1,
    ContractName: 'Microsoft license',
    Type: 'Software license',
    Status: 'Active',
    RenewalStatus: '---',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
  {
    id: 2,
    ContractName: 'Dell Contract',
    Type: 'Lease',
    Status: 'Active',
    RenewalStatus: 'Extended',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
  {
    id: 3,
    ContractName: 'Apple License',
    Type: 'Warranty',
    Status: 'Terminated',
    RenewalStatus: '---',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
  {
    id: 4,
    ContractName: 'Dell license',
    Type: 'Warranty',
    Status: 'Draft',
    RenewalStatus: '---',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
];
export const softwareListsColumnsFunction = (
  contractsData: any,
  setContractsData: any,
  mainContractsData: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!contractsData?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setContractsData([
                ...contractsData,
                mainContractsData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setContractsData(
                contractsData?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={contractsData?.length === mainContractsData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setContractsData([...mainContractsData])
            : setContractsData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.ContractName,
    id: 'ContractName',
    isSortable: false,
    header: 'Contract Name',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_CONTRACTS_DETAIL,
            query: {
              contractId: info?.row?.id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.Type,
    id: 'Type',
    header: 'Type',
    isSortable: false,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'Status',
    isSortable: false,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.RenewalStatus,
    id: 'RenewalStatus',
    isSortable: false,
    header: 'Renewal Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ContractNumber,
    id: 'ContractNumber',
    isSortable: false,
    header: 'Contract Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Vendor,
    id: 'Vendor',
    isSortable: false,
    header: 'Vendor',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ExpiryDate,
    id: 'ExpiryDate',
    isSortable: false,
    header: 'Expiry Date',
    cell: (info: any) => info?.getValue(),
  },
];
