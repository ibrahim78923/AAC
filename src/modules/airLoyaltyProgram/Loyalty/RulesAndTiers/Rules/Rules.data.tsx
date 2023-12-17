import { AntSwitch } from '@/components/AntSwitch';

export const rulesList = [
  {
    _id: 1,
    rulesTitle: 'Purchase amount',
    tiers: 'Base tier',
    status: true,
  },
  {
    _id: 2,
    rulesTitle: 'Amount creation',
    tiers: 'gold',
    status: false,
  },
];

export const rulesColumns = [
  {
    accessorFn: (info: any) => info?.rulesTitle,
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
