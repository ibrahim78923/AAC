import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useStatisticsCard from './useStatisticsCard';
import { styles } from './StatisticsCard.style';
import useSMSDashboard from '../useSMSDashboard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const StatisticsCard = () => {
  const { series, options, theme } = useStatisticsCard();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const { dashboardGraphData, dashboardLoading } = useSMSDashboard();

  return (
    <>
      {dashboardLoading ? (
        <SkeletonTable />
      ) : (
        <Box sx={styles?.staticCardStyle}>
          <Typography
            variant="body2"
            sx={{
              color: `${theme?.palette?.custom?.dark_blue}`,
              fontWeight: 600,
            }}
          >
            SMS Conversation
          </Typography>
          <ReactApexChart
            options={options}
            series={series(dashboardGraphData)}
            type="bar"
            height={450}
          />
        </Box>
      )}
    </>
  );
};

export default StatisticsCard;
