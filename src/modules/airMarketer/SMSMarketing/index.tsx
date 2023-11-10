import { Box, Typography } from '@mui/material';
import CommonTabs from '@/components/Tabs';
import SMSDashboard from './SMSDashboard';

const SMSMarketing = () => {
  return (
    <Box>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ display: { md: 'flex' } }}
      >
        <Typography variant="h4">SMS Marketing</Typography>
      </Box>
      <CommonTabs
        tabsArray={['Dashboard', 'SMS Broadcast', 'Contacts', 'Templates']}
      >
        <SMSDashboard />
      </CommonTabs>
    </Box>
  );
};

export default SMSMarketing;
