import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Typography } from '@mui/material';
import NetworkWarningLogs from './NetworkWarningLogs';
import CallTags from './CallTags';

const AdditionalSettings = () => {
  return (
    <>
      <Box m={2} mb={3}>
        <Typography variant="h3" color="slateBlue.main">
          Additional Settings
        </Typography>
      </Box>
      <Box m={2}>
        <HorizontalTabs tabsDataArray={['Network Warning Logs', 'Call Tags']}>
          <NetworkWarningLogs />
          <CallTags />
        </HorizontalTabs>
      </Box>
    </>
  );
};

export default AdditionalSettings;
