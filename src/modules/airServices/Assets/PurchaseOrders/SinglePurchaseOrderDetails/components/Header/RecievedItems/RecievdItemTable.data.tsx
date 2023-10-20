import { RecievedItemTableDataI } from './RecievedItem.interface';

export const data: RecievedItemTableDataI[] = [
  {
    Id: 1,
    itemname: 'Andrea',
    received: 0,
    ordered: 3,
    pending: 3,
  },
  {
    Id: 2,
    itemname: 'Andrea ',
    received: 0,
    ordered: 3,
    pending: 3,
  },
];
export const columns: any = () => [
  {
    accessorFn: (row: any) => row.itemname,
    id: 'itemname',

    header: 'Item Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.received,
    id: 'received',

    header: 'Received',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.ordered,
    id: ' ordered',

    header: ' Ordered',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.pending,
    id: ' pending',

    header: ' Pending',
    cell: (info: any) => info.getValue(),
  },
];
