import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { getGriftCardsColumns } from './GriftCards.data';

export const GriftCards = (props: any) => {
  const { griftCardsData } = props;

  const griftCardsColumns = getGriftCardsColumns();

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
        <Typography variant={'h4'}>Grift Cards</Typography>

        <Link href={AIR_LOYALTY_PROGRAM?.GIFT_CARDS}>
          <Button>View All</Button>
        </Link>
      </Box>

      <TanstackTable columns={griftCardsColumns} data={griftCardsData} />
    </Box>
  );
};
