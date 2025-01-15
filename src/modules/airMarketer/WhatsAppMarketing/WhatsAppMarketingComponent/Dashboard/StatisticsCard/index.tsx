import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useStatisticsCard from './useStatisticsCard';
import { styles } from './StatisticsCard.style';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { DatePicker } from '@mui/x-date-pickers';
import useDashboard from '../useDashboard';

const StatisticsCard = () => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const { options, theme, series } = useStatisticsCard();

  const {
    selectedDate,
    setSelectedDate,
    getWhatsappDashboardData,
    getWhatsappDashboardLoading,
  } = useDashboard();

  const analyticsGraphData = getWhatsappDashboardData?.data?.statistics;

  return (
    <Box sx={styles?.staticCardStyle}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: `${theme?.palette?.custom?.dark_blue}`,
            fontWeight: 600,
          }}
        >
          Total Conversion
        </Typography>
        <DatePicker
          views={['year']}
          value={selectedDate}
          onChange={(newValue: any) => {
            setSelectedDate(newValue);
          }}
        />
      </Box>

      {getWhatsappDashboardLoading ? (
        <SkeletonTable />
      ) : (
        <ReactApexChart
          options={options}
          series={series(analyticsGraphData)}
          type="area"
          height={450}
        />
      )}
    </Box>
  );
};

export default StatisticsCard;
