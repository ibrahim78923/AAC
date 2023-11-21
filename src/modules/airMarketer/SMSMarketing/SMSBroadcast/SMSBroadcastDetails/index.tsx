import { Box, Stack, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import useSMSBroadcast from '../useSMSBroadcast';

import SMSDetails from './SMSDetails';

import Analytics from './Analytics';

import { styles } from './SMSBroadcastDetails.style';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_MARKETER } from '@/routesConstants/paths';

const SMSBroadcastDetails = () => {
  const { theme, navigate } = useSMSBroadcast();
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowBackIcon
            onClick={() => {
              navigate.push(AIR_MARKETER?.SMS_MARKETING);
            }}
            sx={{ cursor: 'pointer' }}
          />
          <Typography variant="h3">Test Broad</Typography>
        </Box>
        <Box sx={styles.status(theme)}>Completed</Box>
      </Stack>
      <CommonTabs tabsArray={['SMS Details', 'Analytics']}>
        <SMSDetails />
        <Analytics />
      </CommonTabs>
    </>
  );
};

export default SMSBroadcastDetails;
