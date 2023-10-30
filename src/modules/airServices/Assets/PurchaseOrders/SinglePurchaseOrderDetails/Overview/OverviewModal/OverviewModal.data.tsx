import { useTheme } from '@mui/material';

export const overviewTablePdfColumns: any = () => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row?.itemName,
      id: 'itemName',
      cell: (info: any) => (
        <span style={{ color: theme?.palette?.blue?.dull_blue }}>
          {info?.getValue()}
        </span>
      ),
      header: 'Item Name',
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      header: 'Description',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.costPerItem,
      id: 'costPerItem',
      header: 'Cost Per Item',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.receivedVsOrdered,
      id: 'receivedVsOrdered',
      header: 'Received Vs Ordered',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.pending,
      id: 'pending',
      header: 'Pending',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.taxRate,
      id: 'taxRate',
      header: 'Tax Rate (%)',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.total,
      id: 'total',
      header: 'Total ()',
      cell: (info: any) => info?.getValue(),
    },
  ];
};

export const overviewListPdfData: any = [
  {
    Id: 1,
    itemName: `Andrea`,
    description: 'Per Unit',
    costPerItem: '30',
    receivedVsOrdered: '2/2',
    pending: '2',
    taxRate: '0',
    total: '60',
  },
];
