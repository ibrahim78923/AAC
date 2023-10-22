export const data: any = [
  {
    id: 1,
    ContractName: 'Microsoft license',
    LicenseType: 'Volume',
    NoofLicenses: '1',
    Status: '22 Mar, 2023',
    CreatedDate: '22 Mar, 2023',
    ExpiryDate: '26 Oct, 2023',
  },
];
export const columns = (theme: any) => [
  {
    accessorFn: (row: any) => row.ContractName,
    id: 'Contract Name',
    isSortable: true,
    header: <span>Contract Name</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.LicenseType,
    id: 'License Type',
    header: <span>License Type</span>,
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.NoofLicenses,
    id: 'No of Licenses',
    isSortable: true,
    header: <span>No of Licenses</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    isSortable: true,
    header: <span>Status</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.CreatedDate,
    id: 'Created Date',
    isSortable: true,
    header: <span>Created Date</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.ExpiryDate,
    id: 'Expiry Date',
    isSortable: true,
    header: <span>Expiry Date</span>,
    cell: (info: any) => info.getValue(),
  },
];
