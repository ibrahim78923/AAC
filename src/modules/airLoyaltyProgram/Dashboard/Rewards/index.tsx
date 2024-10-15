import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { getRewardsColumns } from './Rewards.data';

export const Rewards = (props: any) => {
  const { rewardsData } = props;

  const rewardsColumns = getRewardsColumns();

  return (
    <Box
      border={1}
      borderColor={'custom.pale_gray'}
      borderRadius={3}
      bgcolor={'common.white'}
    >
      <Box
        display={'flex'}
        gap={1}
        alignItems={'center'}
        p={1}
        justifyContent={'space-between'}
      >
        <Typography variant={'h5'}>Rewards</Typography>

        <Link href={AIR_LOYALTY_PROGRAM?.REWARDS}>
          <Button>View All</Button>
        </Link>
      </Box>

      <TanstackTable columns={rewardsColumns} data={rewardsData} />
    </Box>
  );
};
