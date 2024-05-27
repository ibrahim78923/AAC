export const ContractReportsCardData = () => {
  return {
    All: '10',
    Lease: '10',
    Maintaince: '9',
    Software: '8',
    Warranty: '7',
  };
};
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
    cell: (info: any) => info?.getValue(),
    header: 'Contract Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'status',
    cell: (info: any) => info?.getValue(),
    header: 'Status',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.managedby,
    id: 'type',
    cell: (info: any) => info?.getValue(),
    header: 'Type',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.category,
    id: 'expirydate',
    cell: (info: any) => info?.getValue(),
    header: 'Expiry Date',
    isSortable: false,
  },
];
