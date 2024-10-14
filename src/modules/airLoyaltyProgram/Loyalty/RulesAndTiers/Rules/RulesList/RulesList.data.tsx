import { TruncateText } from '@/components/TruncateText';
import { LOYALTY_RULES_ATTRIBUTES_MAPPED } from '@/constants/api-mapped';
import { UpdateRuleStatus } from '../UpdateRuleStatus';
import { Box } from '@mui/material';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { uiDateFormat } from '@/utils/dateTime';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';

const { EDIT_RULES, DELETE_RULES } =
  RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS ?? {};

export const rulesListColumnsDynamic = (
  setAction: (action: string, data: any) => void,
) => [
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
    cell: (info: any) => <TruncateText text={info?.getValue()?.name} />,
  },
  {
    accessorFn: (info: any) => info?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <UpdateRuleStatus
        currentId={info?.row?.original?._id}
        currentStatus={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (info: any) => info?.createdAt,
    id: 'createdAt',
    header: 'Created at',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (info: any) => info?.actions,
    id: 'action',
    header: 'Actions',
    cell: (info: any) => (
      <Box display={'flex'}>
        <Box
          onClick={() => {
            setAction(EDIT_RULES, info?.row?.original);
          }}
          sx={{ cursor: 'pointer' }}
        >
          <EditYellowBGPenIcon />
        </Box>
        <DeleteForever
          color={'error'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setAction(DELETE_RULES, info?.row?.original);
          }}
        />
      </Box>
    ),
  },
];
