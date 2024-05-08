import { AntSwitch } from '@/components/AntSwitch';

export const rulesColumnsDynamic = () => [
  {
    accessorFn: (info: any) => info?.attribute,
    id: 'rulesTitle',
    header: 'Rules Title',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (info: any) => info?.tiers,
    id: 'tiers',
    header: 'Tiers',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (info: any) => info?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
