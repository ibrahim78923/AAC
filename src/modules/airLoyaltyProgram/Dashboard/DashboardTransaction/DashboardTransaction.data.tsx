export const transactionsData = [
  {
    id: '126645543',
    shopName: 'sharemydine',
    credits: 50,
  },
  {
    id: '126645543',
    shopName: 'sharemydine',
    credits: 120,
  },
  {
    id: 'HMW2ORKK7',
    shopName: 'sharemydine',
    credits: 150,
  },
  {
    id: 'HMW2ORKK7',
    shopName: 'sharemydine',
    credits: 12,
  },
  {
    id: 'HMW2ORKK7',
    shopName: 'sharemydine',
    credits: 16,
  },
];

export const transactionsColumns = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    header: 'Id',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.shopName,
    id: 'shopName',
    header: 'Shop Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.credits,
    id: 'credits',
    header: 'Credits',
    cell: (info: any) => info?.getValue(),
  },
];
