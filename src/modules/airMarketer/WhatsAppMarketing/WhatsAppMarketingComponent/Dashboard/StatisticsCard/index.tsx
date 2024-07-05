import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useStatisticsCard from './useStatisticsCard';
import { styles } from './StatisticsCard.style';

const StatisticsCard = ({ isDashboardData = true, whatsappAnalytics }: any) => {
  const { series, options, theme, updatedSeries } =
    useStatisticsCard(whatsappAnalytics);
  const analyticData = isDashboardData ? series : updatedSeries;

  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Box sx={{ p: '0 24px' }}>
      <Box sx={styles?.staticCardStyle}>
        <Typography
          variant="h4"
          sx={{
            color: `${theme?.palette?.custom?.dark_blue}`,
            fontWeight: 600,
          }}
        >
          Total Conversion
        </Typography>
        <ReactApexChart
          options={options}
          series={analyticData}
          type="area"
          height={450}
        />
      </Box>
    </Box>
  );
};

export default StatisticsCard;
