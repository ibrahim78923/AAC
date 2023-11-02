import { ReceivedItemsDataI } from './ReceivedItems.interface';

export const data: ReceivedItemsDataI[] = [
  {
    Id: 1,
    itemName: 'Andrea',
    received: 0,
    ordered: 3,
    pending: 3,
  },
  {
    Id: 2,
    itemName: 'Andrea ',
    received: 0,
    ordered: 3,
    pending: 3,
  },
];
export const columns: any = () => [
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
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ordered,
    id: ' ordered',

    header: ' Ordered',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.pending,
    id: ' pending',

    header: ' Pending',
    cell: (info: any) => info?.getValue(),
  },
];
