import TextField from '@mui/material/TextField';

export const receivedItemsColumns: any = (
  setReceivedAmount: any,
  receivedAmount: any,
) => [
  {
    accessorFn: (row: any) => row?.itemName,
    id: 'itemName',
    header: 'Item Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.received,
    id: 'received',
    header: 'Received',
    cell: () => (
      <TextField
        value={receivedAmount}
        onChange={(e) => setReceivedAmount(e.target.value)}
        type="number"
        size="small"
      />
    ),
  },

  {
    accessorFn: (row: any) => row?.quantity,
    id: 'ordered',
    header: 'Ordered',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'pending',
    header: 'Pending',
    cell: (info: any) => info?.getValue(),
  },
];
