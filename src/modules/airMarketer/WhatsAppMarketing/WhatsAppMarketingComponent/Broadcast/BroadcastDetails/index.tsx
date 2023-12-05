import { Box, Stack, Typography } from '@mui/material';
import CommonTabs from '@/components/Tabs';
import useSMSBroadcast from '../useBroadcast';
import BroadcastDetailsTab from './BroadcastDetailsTab';
import AnalyticsTab from './AnalyticsTab';
import { styles } from './BroadcastDetails.style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_MARKETER } from '@/routesConstants/paths';

const BroadcastDetails = () => {
  const { navigate, statusTag } = useSMSBroadcast();
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowBackIcon
            onClick={() => {
              navigate.push(AIR_MARKETER?.WHATSAPP_MERKETING);
            }}
            sx={{ cursor: 'pointer' }}
          />
          <Typography variant="h3">Test Broadcast</Typography>
        </Box>
        <Box sx={styles?.cardHeader}>
          <Box
            sx={{
              width: '10px',
              height: '10px',
              backgroundColor: `${statusTag('Completed')}`,
              borderRadius: '50%',
            }}
          />
          <Typography>Completed</Typography>
        </Box>
      </Stack>
      <CommonTabs tabsArray={['Broadcast Details', 'Analytics']}>
        <BroadcastDetailsTab />
        <AnalyticsTab />
      </CommonTabs>
    </>
  );
};

export default BroadcastDetails;
