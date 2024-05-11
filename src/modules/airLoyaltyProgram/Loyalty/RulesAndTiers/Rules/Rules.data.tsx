import { AntSwitch } from '@/components/AntSwitch';
import { LOYALTY_RULES_ATTRIBUTES_MAPPED } from '@/constants/api-mapped';
import { LOYALTY_RULE_STATUS } from '@/constants/strings';
import { truncateText } from '@/utils/avatarUtils';

export const rulesColumnsDynamic = (changeStatus: any) => [
  {
    accessorFn: (info: any) => info?.attribute,
    id: 'rulesTitle',
    header: 'Rules Title',
    isSortable: true,
    cell: (info: any) => LOYALTY_RULES_ATTRIBUTES_MAPPED?.[info?.getValue()],
  },
  {
    accessorFn: (info: any) => info?.tierDetails,
    id: 'tiers',
    header: 'Tiers',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue()?.name),
  },
  {
    accessorFn: (info: any) => info?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <AntSwitch
        checked={info?.getValue() === LOYALTY_RULE_STATUS?.ACTIVE}
        onChange={(e: any) => changeStatus?.(e, info?.row?.original?._id)}
      />
    ),
  },
];
