import { truncateText } from '@/utils/avatarUtils';
import { Visibility } from '@mui/icons-material';
import { RULES_AND_TIERS_ACTION_CONSTANTS } from '../RulesAndTiers.data';

export const tiersList = [
  {
    _id: 1,
    tiers: 'Base tier',
    noOfMembers: 10,
  },
  {
    _id: 2,
    tiers: 'Gold',
    noOfMembers: 4,
  },
];

export const tiersColumnsDynamic = (setRulesAndTiersAction: any) => [
  {
    accessorFn: (info: any) => info?.name,
    id: 'tiers',
    header: 'Tiers',
    cell: (info: any) => truncateText(info?.getValue()),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?.noOfMembers,
    id: 'noOfMembers',
    header: 'No of members',
    cell: (info: any) => info?.getValue(),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?._id,
    id: '_id',
    header: 'Action',
    cell: () => (
      <Visibility
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          setRulesAndTiersAction?.(
            RULES_AND_TIERS_ACTION_CONSTANTS?.TIER_DETAILS,
          )
        }
      />
    ),
  },
];
