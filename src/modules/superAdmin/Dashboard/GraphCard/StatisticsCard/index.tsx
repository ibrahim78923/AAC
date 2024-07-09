import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { styles } from './StatisticsCard.style';
import useStatisticsCard from './useStatisticsCard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { StatisticsCardPropsI } from '@/modules/superAdmin/Dashboard/Dashboard-interface';

const StatisticsCard = ({ isLoading, data }: StatisticsCardPropsI) => {
  const { series, options, theme } = useStatisticsCard(data);
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <>
      {isLoading ? (
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
            Plan Statistics
          </Typography>
          <Box>
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={460}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default StatisticsCard;
