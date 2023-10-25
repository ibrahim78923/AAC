import { useTheme } from '@mui/material';

export const overViewData = [
  {
    id: '1',
    heading: 'Purchase Details',
    DetailsData: [
      { name: 'Vendor', detail: 'Dell' },
      { name: 'Details', detail: 'Dell monitor' },
      { name: 'Currency', detail: 'Pound' },
      { name: 'Department', detail: '--' },
      { name: 'Expected delivery date', detail: '28 Mar, 2023' },
      { name: 'Location', detail: 'Street no 22' },
      {
        name: 'Terms and conditins',
        detail: 'I agree all the terms and conditions',
      },
    ],
  },
];

export const overViewTableColumns: any = (setOpenOverviewModel: any) => {
  const theme = useTheme();
  const handleOpen = () => {
    setOpenOverviewModel(true);
  };
  return [
    {
      accessorFn: (row: any) => row.itemName,
      id: 'itemName',
      cell: (info: any) => (
        <span style={{ color: theme?.palette?.blue?.dull_blue }}>
          {info.getValue()}
        </span>
      ),
      header: 'Item Name',
    },
    {
      accessorFn: (row: any) => row.description,
      id: 'description',
      header: 'Description',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.costPerItem,
      id: 'costPerItem',
      header: 'Cost Per Item',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.quantity,
      id: 'quantity',
      header: 'Quantity',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.taxRate,
      id: 'taxRate',
      header: 'Tax Rate (%)',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.total,
      id: 'total',
      header: 'Total ()',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.invoice,
      id: 'invoice',
      header: 'Invoice',
      cell: (info: any) => (
        <span
          style={{ cursor: 'pointer', color: theme?.palette?.primary?.main }}
          onClick={handleOpen}
        >
          {info.getValue()}
        </span>
      ),
    },
  ];
};
export const overViewTableData: any = [
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

export const overViewTablePdfColumns: any = () => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.itemName,
      id: 'itemName',
      cell: (info: any) => (
        <span style={{ color: theme?.palette?.blue?.dull_blue }}>
          {info.getValue()}
        </span>
      ),
      header: 'Item Name',
    },
    {
      accessorFn: (row: any) => row.description,
      id: 'description',
      header: 'Description',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.costPerItem,
      id: 'costPerItem',
      header: 'Cost Per Item',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.receivedVsOrdered,
      id: 'receivedVsOrdered',
      header: 'Received Vs Ordered',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.pending,
      id: 'pending',
      header: 'Pending',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.taxRate,
      id: 'taxRate',
      header: 'Tax Rate (%)',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.total,
      id: 'total',
      header: 'Total ()',
      cell: (info: any) => info.getValue(),
    },
  ];
};

export const overViewTablePdfData: any = [
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

export const ModelBillingData = [
  { label: 'subTotal ($)', value: 144.0 },
  { label: 'discount (%)', value: 0 },
  { label: 'Tax rate (%)', value: 0 },
  { label: 'shipping ($)', value: 0 },
  { label: 'total ($)', value: 0 },
];
