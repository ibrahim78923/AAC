export const SoftwareReportsCardsData = () => {
  return {
    TotalSoftware: '10',
    Restricted: '10',
    Ignored: '9',
    Managed: '8',
    Disabled: '7',
    InReview: '6',
  };
};

export const softwareReportsTabelCoulmns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    cell: (info: any) => info?.getValue(),
    header: 'Type',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.managedby,
    id: 'managedby',
    cell: (info: any) => info?.getValue(),
    header: 'Managed by',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.category,
    id: 'category',
    cell: (info: any) => info?.getValue(),
    header: 'Category',
    isSortable: false,
  },
];
export const softwareReportsTableData = [
  {
    name: 'Freshsevice',
    type: '',
    managedby: '',
    category: '',
  },
  {
    name: 'Microsoft Office 365',
    type: '',
    managedby: '',
    category: '',
  },
];
