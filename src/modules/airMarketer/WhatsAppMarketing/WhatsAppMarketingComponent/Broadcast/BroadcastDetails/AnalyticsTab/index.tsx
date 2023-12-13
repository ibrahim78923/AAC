import { Box } from '@mui/material';
import StatusCards from '../../../Dashboard/StatusCards';
import StatisticsCard from '../../../Dashboard/StatisticsCard';

const AnalyticsTab = () => {
  return (
    <>
      <Box sx={{ p: '24px' }}>
        <StatusCards />
      </Box>
      <Box sx={{ p: '24px' }}>
        <StatisticsCard />
      </Box>
    </>
  );
};

export default AnalyticsTab;
