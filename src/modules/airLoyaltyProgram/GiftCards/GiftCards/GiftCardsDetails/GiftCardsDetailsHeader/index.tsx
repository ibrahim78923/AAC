import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

export const GiftCardsDetailsHeader = () => {
  const router = useRouter();
  return (
    <Box>
      <PageTitledHeader
        title={'TVKP12345'}
        addTitle={'Add Transaction'}
        canMovedBack
        moveBack={() => {
          router.push(AIR_LOYALTY_PROGRAM?.GIFT_CARDS);
        }}
      />
    </Box>
  );
};
