import { REQUESTORS_STATUS } from '@/constants/strings';
import { Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const rewardsData = [
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 100,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 120,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 150,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 12,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 16,
    status: 'Active',
  },
];
export const rewardsColumns = [
  {
    accessorFn: (row: any) => row?.rewardName,
    id: 'rewardName',
    header: 'Reward Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.requiredCredits,
    id: 'requiredCredits',
    header: 'Required Credits',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          backgroundColor:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.lighter'
              : 'custom.error_lighter',
          color:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.main'
              : 'error.main',
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={
              info?.getValue()?.toLowerCase() ===
              REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
                ? 'success'
                : 'error'
            }
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
];
