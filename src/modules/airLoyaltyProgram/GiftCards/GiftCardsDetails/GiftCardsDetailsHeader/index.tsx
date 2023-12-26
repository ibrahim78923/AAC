import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';

export const GiftCardsDetailsHeader = () => {
  return (
    <Box>
      <PageTitledHeader
        title={'TVKP12345'}
        addTitle={'Add Transaction'}
        canMovedBack
        moveBack={() => {}}
      />
    </Box>
  );
};
