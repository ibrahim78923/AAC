import { ContractItemTableDataI } from './ContractItem.interface';

export const data: ContractItemTableDataI[] = [
  {
    Id: 1,
    serviceName: 'Andrea',
    principleModel: 'Per Unit',
    cost: 0,
    count: '0 Per unit',
    comments: '',
  },
];
export const columns: any = () => [
  {
    accessorFn: (row: any) => row.serviceName,
    id: 'serviceName',

    header: 'Service Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.principleModel,
    id: 'principleModel',

    header: 'Principle Model',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.cost,
    id: '  cost',

    header: '  cost',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.count,
    id: ' count',

    header: ' Count*',

    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.comments,
    id: ' comments',

    header: ' Comments',

    cell: (info: any) => info.getValue(),
  },
];
