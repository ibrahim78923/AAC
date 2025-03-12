import { LOYALTY_RULES_ATTRIBUTES_MAPPED } from '@/constants/api-mapped';
import { UpdateRuleStatus } from '../UpdateRuleStatus';
import { Box } from '@mui/material';
import { EditYellowBgIcon, TrashIcon } from '@/assets/icons';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';
import { UserInfo } from '@/components/UserInfo';
import { fullName } from '@/utils/avatarUtils';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';

const { EDIT_RULES, DELETE_RULES } =
  RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS ?? {};

const { EDIT_OR_DELETE_RULES } =
  AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS ?? {};

export const rulesListColumnsDynamic = (
  setAction: (action: string, data: any) => void,
) => [
  {
    accessorFn: (info: any) => info?.attribute,
    id: 'rulesTitle',
    header: 'Rules Name',
    isSortable: true,
    cell: (info: any) => LOYALTY_RULES_ATTRIBUTES_MAPPED?.[info?.getValue()],
  },
  {
    accessorFn: (info: any) => info?.tierDetails,
    id: 'tiers',
    header: 'Tiers',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        avatarSrc={info?.row?.original?.tierAttachments?.fileUrl}
        name={fullName(info?.getValue()?.name)}
      />
    ),
  },
  {
    accessorFn: (info: any) => info?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <UpdateRuleStatus currentId={info} currentStatus={info?.getValue()} />
    ),
  },
  {
    accessorFn: (info: any) => info?.createdAt,
    id: 'createdAt',
    header: 'Created at',
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A),
  },
  {
    accessorFn: (info: any) => info?.actions,
    id: 'action',
    header: 'Actions',
    cell: (info: any) => (
      <PermissionsGuard permissions={[EDIT_OR_DELETE_RULES]}>
        <Box display={'flex'} gap={0.5} alignItems={'center'}>
          <Box
            onClick={() => {
              setAction(EDIT_RULES, info?.row?.original);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <EditYellowBgIcon />
          </Box>
          <Box
            onClick={() => {
              setAction(DELETE_RULES, info?.row?.original);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <TrashIcon />
          </Box>
        </Box>
      </PermissionsGuard>
    ),
  },
];
