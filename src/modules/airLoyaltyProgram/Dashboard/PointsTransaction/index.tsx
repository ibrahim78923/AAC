import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { getPointsTransactionColumns } from './PointsTransaction.data';

export const PointsTransaction = (props: any) => {
  const { pointsTransactionData } = props;

  const pointsTransactionColumns = getPointsTransactionColumns();

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
        <Typography variant={'h5'}>Points Transaction</Typography>

        <Link href={AIR_LOYALTY_PROGRAM?.TRANSACTIONS}>
          <Button>View All</Button>
        </Link>
      </Box>

      <TanstackTable
        columns={pointsTransactionColumns}
        data={pointsTransactionData}
      />
    </Box>
  );
};
