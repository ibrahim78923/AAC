import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useStatisticsCard from './useStatisticsCard';
import { styles } from './StatisticsCard.style';

const StatisticsCard = ({ data }: any) => {
  const { options, theme, updatedSeries } = useStatisticsCard(
    data?.statistics,
  ) as {
    options: any;
    theme: any;
    updatedSeries: { name?: string; data: any[] }[];
  };

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
        {/* <SkeletonTable /> */}

        <ReactApexChart
          options={options}
          series={updatedSeries}
          type="area"
          height={450}
        />
      </Box>
    </Box>
  );
};

export default StatisticsCard;
