import { ReceiveCard } from './ReceiveCard';

export const ReceiveTableData = [
  {
    id: 1,
    smd: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    rayShop: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    akHub: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    zamStore: {
      receive: 'Ray Shop',
      price: 20.0,
    },
  },
  {
    id: 2,
    smd: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    rayShop: {
      receive: 'Ray Shop',
      price: 0.0,
    },
    akHub: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    zamStore: {
      receive: 'Ray Shop',
      price: 0.0,
    },
  },
  {
    id: 3,
    smd: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    rayShop: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    akHub: {
      receive: 'Ray Shop',
      price: 20.0,
    },
    zamStore: {
      receive: 'Ray Shop',
      price: 20.0,
    },
  },
];
export const singleReceiveDetailsColumns: any = [
  {
    accessorFn: (row: any) => row?.smd,
    id: 'smd',
    header: 'Sharemydine',
    cell: (info: any) => <ReceiveCard values={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.rayShop,
    id: 'rayShop',
    header: 'Ray Shop',
    cell: (info: any) => <ReceiveCard values={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.akHub,
    id: 'akHub',
    header: 'AK Hub',
    cell: (info: any) => <ReceiveCard values={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.zamStore,
    id: 'zamStore',
    header: 'Zam Store',
    cell: (info: any) => <ReceiveCard values={info?.getValue()} />,
  },
];
