import { AntSwitch } from '@/components/AntSwitch';
import { LOYALTY_RULES_ATTRIBUTES_MAPPED } from '@/constants/api-mapped';

export const rulesColumnsDynamic = () => [
  {
    accessorFn: (info: any) => info?.attribute,
    id: 'rulesTitle',
    header: 'Rules Title',
    isSortable: true,
    cell: (info: any) => LOYALTY_RULES_ATTRIBUTES_MAPPED?.[info?.getValue()],
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
