import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Typography } from '@mui/material';
import { Receive } from './Receive';
import { Pay } from './Pay';

export const Settled = () => {
  return (
    <>
      <Typography variant="h3">Settled</Typography>
      <Box mt={2}>
        <HorizontalTabs tabsDataArray={['Receive', 'Pay']}>
          <Receive />
          <Pay />
        </HorizontalTabs>
      </Box>
    </>
  );
};
