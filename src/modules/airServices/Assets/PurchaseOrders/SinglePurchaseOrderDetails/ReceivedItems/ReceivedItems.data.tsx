// import { TextField } from '@mui/material';
import Text from './text';
export const receivedItemsColumns: any = () => [
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
    cell: (info: any) => <Text value={info?.row?.original?._id} />,
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
