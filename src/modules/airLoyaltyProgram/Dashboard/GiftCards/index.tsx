import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { getGiftCardsColumns } from './GiftCards.data';

export const GiftCards = (props: any) => {
  const { giftCardsData } = props;

  const giftCardsColumns = getGiftCardsColumns();

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
        <Typography variant={'h5'}>Gift Cards</Typography>

        <Link href={AIR_LOYALTY_PROGRAM?.GIFT_CARDS}>
          <Button>View All</Button>
        </Link>
      </Box>

      <TanstackTable columns={giftCardsColumns} data={giftCardsData} />
    </Box>
  );
};
