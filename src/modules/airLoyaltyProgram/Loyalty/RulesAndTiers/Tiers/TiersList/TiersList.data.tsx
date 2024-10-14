import { TruncateText } from '@/components/TruncateText';
import { Box } from '@mui/material';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { uiDateFormat } from '@/utils/dateTime';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';

const { EDIT_TIERS, DELETE_TIERS } =
  RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS ?? {};

export const tiersListColumnsDynamic = (
  setAction: (action: string, data: any) => void,
) => [
  {
    accessorFn: (info: any) => info?.name,
    id: 'tiers',
    header: 'Tiers',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
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
  {
    accessorFn: (info: any) => info?.createdAt,
    id: 'createdAt',
    header: 'Created at',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (info: any) => info?.action,
    id: 'action',
    header: 'Action',
    cell: (info: any) => (
      <Box display={'flex'}>
        <Box
          onClick={() => {
            setAction(EDIT_TIERS, info?.row?.original);
          }}
          sx={{ cursor: 'pointer' }}
        >
          <EditYellowBGPenIcon />
        </Box>
        <DeleteForever
          color={'error'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setAction(DELETE_TIERS, info?.row?.original);
          }}
        />
      </Box>
    ),
  },
];
