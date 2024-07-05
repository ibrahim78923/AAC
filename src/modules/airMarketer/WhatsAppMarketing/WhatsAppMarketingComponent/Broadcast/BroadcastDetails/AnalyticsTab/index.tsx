import { Box } from '@mui/material';
import StatusCards from '../../../Dashboard/StatusCards';
import StatisticsCard from '../../../Dashboard/StatisticsCard';

const AnalyticsTab = ({ isLoading, statisticsData, isDashboardData }: any) => {
  return (
    <>
      <Box sx={{ p: '24px' }}>
        <StatusCards
          whatsappAnalytics={statisticsData}
          loading={isLoading}
          isDashboardData={isDashboardData}
        />
      </Box>
      <Box sx={{ p: '24px' }}>
        <StatisticsCard
          whatsappAnalytics={statisticsData?.statistics}
          isDashboardData={isDashboardData}
        />
      </Box>
    </>
  );
};

export default AnalyticsTab;
