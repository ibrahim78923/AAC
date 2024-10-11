import { Box } from '@mui/material';
import StatusCards from '../../../Dashboard/StatusCards';
import StatisticsCard from '../../../Dashboard/StatisticsCard';

const AnalyticsTab = ({ isLoading, statisticsData }: any) => {
  return (
    <>
      <Box sx={{ p: '24px' }}>
        <StatusCards whatsappAnalytics={statisticsData} loading={isLoading} />
      </Box>
      <Box sx={{ p: '24px' }}>
        <StatisticsCard
          loading={isLoading}
          whatsappAnalytics={statisticsData?.statistics}
        />
      </Box>
    </>
  );
};

export default AnalyticsTab;
