import { Box } from '@mui/material';

// products table data
export const productsTableColumns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'productName',
    header: 'Product Name',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => (
      <Box dangerouslySetInnerHTML={{ __html: info?.getValue() }}></Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: ({ _id }: { _id: string }) => _id,
    id: 'totalPrice',
    isSortable: true,
    header: 'Total Price',
    cell: ({ row: { original } }: any) =>
      `£${original?.unitPrice * original?.quantity}`,
  },
];

// products table data
export const productsTableData: any = [
  {
    Sr: '1',
    productName: 'NADSSP - 16',
    unitPrice: '£ 40',
    quantity: '1',
    description: 'gbp',
    totalPrice: '£ 40',
  },
  {
    Sr: '2',
    productName: 'NADSSP - 19',
    unitPrice: '£ 61',
    quantity: '1',
    description: '%',
    totalPrice: '£ 60',
  },
];

export const productTotalDetails = [
  {
    title: 'Subtotal',
    value: '£75',
    detail: [
      { title: 'Tax', value: '20%' },
      { title: 'Unit Discount', value: '30 GBP' },
    ],
  },
];
