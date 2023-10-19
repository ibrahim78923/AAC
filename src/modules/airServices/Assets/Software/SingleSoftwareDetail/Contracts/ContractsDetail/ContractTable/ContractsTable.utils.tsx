import { useTheme } from '@mui/material';

export const ContractsTableColumns: any = () => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.contractName,
      id: 'contractName',
      cell: (info: any) => (
        <span style={{ color: theme?.palette?.blue?.dull_blue }}>
          {info.getValue()}
        </span>
      ),
      header: 'Contract Name',
    },
    {
      accessorFn: (row: any) => row.licenseType,
      id: 'licenseType',
      header: 'License Type',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.noOfLicenses,
      id: 'noOfLicenses',
      header: 'No of Licenses',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdDate,
      id: 'createdDate',
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.expiryDate,
      id: 'expiryDate',
      header: 'Expiry Date',
      cell: (info: any) => info.getValue(),
    },
  ];
};
export const ContractsTableData: any = [
  {
    Id: 1,
    contractName: `Microsoft license`,
    licenseType: 'Volume',
    noOfLicenses: '1',
    status: 'Active',
    createdDate: '22 Mar, 2023',
    expiryDate: '26 Oct, 2023',
  },
  {
    Id: 2,
    contractName: `Microsoft license`,
    licenseType: 'Volume',
    noOfLicenses: '2',
    status: 'In Active',
    createdDate: '05 Apr, 2023',
    expiryDate: '18 Nov, 2023',
  },
];
