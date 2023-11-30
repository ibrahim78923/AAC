import { Typography } from '@mui/material';

export const overviewData = [
  {
    id: '1',
    heading: 'Purchase Details',
    detailsData: [
      { name: 'Vendor', detail: 'Dell' },
      { name: 'Details', detail: 'Dell monitor' },
      { name: 'Currency', detail: 'Pound' },
      { name: 'Department', detail: '--' },
      { name: 'Expected delivery date', detail: '28 Mar, 2023' },
      { name: 'Location', detail: 'Street no 22' },
      {
        name: 'Terms and conditions',
        detail: 'I agree all the terms and conditions',
      },
    ],
  },
];

export const overviewTableColumns: any = (
  setOpenOverviewModal: any,
  theme: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.itemName,
      id: 'itemName',
      cell: (info: any) => (
        <Typography color={theme?.palette?.blue?.dull_blue}>
          {info?.getValue()}
        </Typography>
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
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      header: 'Quantity',
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
    {
      accessorFn: (row: any) => row?.invoice,
      id: 'invoice',
      header: 'Invoice',
      cell: (info: any) => (
        <Typography
          sx={{ cursor: 'pointer', color: theme?.palette?.primary?.main }}
          onClick={() => setOpenOverviewModal(true)}
        >
          {info?.getValue()}
        </Typography>
      ),
    },
  ];
};
export const overviewListData: any = [
  {
    Id: 1,
    itemName: `Andrea`,
    description: 'Per Unit',
    costPerItem: '30',
    quantity: '2',
    taxRate: '0',
    total: '60',
    invoice: 'pdf',
  },
];
