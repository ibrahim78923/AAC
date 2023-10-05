import { Checkbox } from '@mui/material';

export const data: any = [
  {
    Id: 1,

    clientName: ` @olivia`,

    productsSuite: 'Draftstrtr',

    planType: 'Sharemydine',

    discount: 'Alee',

    defaultUsers: 'Tech Support',

    additionalUsers: 'Tech Support',
  },

  {
    Id: 2,

    clientName: ` @olivia`,

    productsSuite: 'Draftstrtr',

    planType: 'Sharemydine',

    discount: 'Alee',

    defaultUsers: 'Tech Support',

    additionalUsers: 'Tech Support',
  },

  {
    Id: 3,

    clientName: ` @olivia`,

    productsSuite: 'Draftstrtr',

    planType: 'Sharemydine',

    discount: 'Alee',

    defaultUsers: 'Tech Support',

    additionalUsers: 'Tech Support',
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,

    id: 'Id',

    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,

    header: <Checkbox color="primary" name="Id" />,

    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.clientName,

    id: 'clientName',

    cell: (info: any) => info.getValue(),

    header: 'Client Name',

    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.productsSuite,

    id: 'productsSuite',

    isSortable: true,

    header: 'Products/Suite',

    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.planType,

    id: 'planType',

    isSortable: true,

    header: 'Plan Type',

    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.discount,

    id: 'discount',

    isSortable: true,

    header: 'Discount',

    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.defaultUsers,

    id: 'defaultUsers',

    isSortable: true,

    header: 'Default users',

    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.additionalUsers,

    id: 'additionalUsers',

    isSortable: true,

    header: 'Additional Users',

    cell: (info: any) => info.getValue(),
  },
];
