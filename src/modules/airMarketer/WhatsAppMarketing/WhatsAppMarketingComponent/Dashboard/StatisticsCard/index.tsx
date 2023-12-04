import dynamic from 'next/dynamic';

import { Box, Typography } from '@mui/material';

import useStatisticsCard from './useStatisticsCard';

import { styles } from './StatisticsCard.style';

const StatisticsCard = () => {
  const { series, options, theme } = useStatisticsCard();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <>
      <Box sx={styles?.staticCardStyle}>
        <Typography
          variant="h4"
          sx={{
            color: `${theme?.palette?.custom?.dark_blue}`,
            fontWeight: 600,
          }}
        >
          Total Conversions
        </Typography>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
        />
      </Box>
    </>
  );
};

export default StatisticsCard;
