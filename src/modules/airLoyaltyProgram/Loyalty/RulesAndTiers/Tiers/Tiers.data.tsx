import { truncateText } from '@/utils/avatarUtils';
import { Visibility } from '@mui/icons-material';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';

export const tiersColumnsDynamic = (
  setIsPortalOpen: any,
  overallPermissions: any,
) => [
  {
    accessorFn: (info: any) => info?.name,
    id: 'tiers',
    header: 'Tiers',
    cell: (info: any) => truncateText(info?.getValue()),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?.contacts,
    id: 'noOfMembers',
    header: 'No of members',
    cell: (info: any) =>
      !!info?.getValue()?.length ? info?.getValue()?.length : '---',
    isSortable: true,
  },
  ...(overallPermissions?.includes(
    AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.VIEW_RULES_AND_TIERS_DETAILS,
  )
    ? [
        {
          accessorFn: (info: any) => info?._id,
          id: '_id',
          header: 'Action',
          cell: () => (
            <Visibility
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsPortalOpen({ isOpen: true, isDetail: true })}
            />
          ),
        },
      ]
    : []),
];
