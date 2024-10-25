import dynamic from 'next/dynamic';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { totalOptionsBar, totalSeriesBar } from './CategoryUsersGraph.data';
import { styles } from '../styles';

const CategoryUsersGraph = ({ categoryUsersData }: any) => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom.off_white_three}`,
        padding: '2rem',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
      >
        Users Analytics
      </Typography>
      <Box sx={styles?.chartWrapper}>
        <ReactApexChart
          options={totalOptionsBar(theme, categoryUsersData)}
          series={totalSeriesBar(categoryUsersData)}
          type="bar"
          height={400}
        />
      </Box>
    </Box>
  );
};

export default CategoryUsersGraph;
