import { Box } from '@mui/material';
import { EditYellowBgIcon, TrashIcon } from '@/assets/icons';
import { Info } from '@mui/icons-material';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';
import { UserInfo } from '@/components/UserInfo';
import { fullName } from '@/utils/avatarUtils';
import { CustomTooltip } from '@/components/CustomTooltip';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
import { LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR } from '@/constants/api';

const { EDIT_TIERS, DELETE_TIERS } =
  RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS ?? {};

export const tiersListColumnsDynamic = (
  setAction: (action: string, data: any) => void,
) => [
  {
    accessorFn: (info: any) => info?.name,
    id: 'tiers',
    header: 'Tiers',
    cell: (info: any) => (
      <UserInfo
        avatarSrc={info?.row?.original?.logo?.fileUrl}
        name={
          <Box display="flex" gap={1} alignItems={'center'}>
            {fullName(info?.getValue())}
            {info?.row?.original?.operator ===
              LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.BASE && (
              <CustomTooltip
                title="By default, all consumers will placed in this tier when they enter the loyalty program"
                tooltipBgColor="common.white"
                tooltipTextColor="blue.main"
              >
                <Info sx={{ color: 'grey.0' }} />
              </CustomTooltip>
            )}
          </Box>
        }
      />
    ),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?.noOfMembers,
    id: 'noOfMembers',
    header: 'No of members',
    cell: (info: any) => (!!info?.getValue() ? info?.getValue() : '---'),
    isSortable: true,
  },
  {
    accessorFn: (info: any) => info?.createdAt,
    id: 'createdAt',
    header: 'Created at',
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A),
  },
  {
    accessorFn: (info: any) => info?.action,
    id: 'action',
    header: 'Action',
    cell: (info: any) => (
      <Box display={'flex'} gap={0.5} alignItems={'center'}>
        <Box
          onClick={() => {
            setAction(EDIT_TIERS, info?.row?.original);
          }}
          sx={{ cursor: 'pointer' }}
        >
          <EditYellowBgIcon />
        </Box>
        {info?.row?.original?.operator !==
          LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.BASE && (
          <Box
            onClick={() => {
              setAction(DELETE_TIERS, info?.row?.original);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <TrashIcon />
          </Box>
        )}
      </Box>
    ),
  },
];
