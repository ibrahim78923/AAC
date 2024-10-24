import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useStatisticsCard from './useStatisticsCard';
import { styles } from './StatisticsCard.style';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const StatisticsCard = ({ loading, whatsappAnalytics }: any) => {
  const { options, theme, updatedSeries } =
    useStatisticsCard(whatsappAnalytics);

  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
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
      {loading ? (
        <SkeletonTable />
      ) : (
        <ReactApexChart
          options={options}
          series={updatedSeries}
          type="area"
          height={450}
        />
      )}
    </Box>
  );
};

export default StatisticsCard;
