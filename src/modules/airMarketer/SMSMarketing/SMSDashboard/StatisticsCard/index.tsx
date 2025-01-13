import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useStatisticsCard from './useStatisticsCard';
import { styles } from './StatisticsCard.style';
import useSMSDashboard from '../useSMSDashboard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { StatusCardsProps } from '../SMSDashboard-interface';
import { DatePicker } from '@mui/x-date-pickers';

const StatisticsCard = ({
  analytics,
  isDashboard = true,
}: StatusCardsProps) => {
  const { series, options, theme } = useStatisticsCard();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const {
    dashboardGraphData,
    dashboardLoading,
    selectedDate,
    setSelectedDate,
  } = useSMSDashboard();
  const analyticsGraphData = isDashboard ? dashboardGraphData : analytics;

  return (
    <>
      {dashboardLoading ? (
        <SkeletonTable />
      ) : (
        <Box sx={styles?.staticCardStyle}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: `${theme?.palette?.custom?.dark_blue}`,
                fontWeight: 600,
              }}
            >
              SMS Conversation
            </Typography>
            <DatePicker
              views={['year']}
              value={selectedDate}
              onChange={(newValue: any) => {
                setSelectedDate(newValue);
              }}
            />
          </Box>
          <ReactApexChart
            options={options}
            series={series(analyticsGraphData)}
            type="bar"
            height={450}
          />
        </Box>
      )}
    </>
  );
};

export default StatisticsCard;
