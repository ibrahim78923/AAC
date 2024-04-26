import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import AllCalls from './tabsComponents/allCalls';
import CallsInQueue from './tabsComponents/callsInQueue';
import CallsInConversation from './tabsComponents/callsInConversation';

const CallMetrics = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '18px',
      }}
    >
      <Box sx={{ padding: '10px 20px' }}>
        <Typography variant="h3">Call Metrics</Typography>
      </Box>
      <Box sx={{ padding: '10px 20px' }}>
        <HorizontalTabs
          tabsDataArray={[
            'All Calls',
            'Calls in Queue',
            'Calls in Conversation',
          ]}
        >
          <AllCalls />
          <CallsInQueue />
          <CallsInConversation />
        </HorizontalTabs>
      </Box>
    </Box>
  );
};

export default CallMetrics;
