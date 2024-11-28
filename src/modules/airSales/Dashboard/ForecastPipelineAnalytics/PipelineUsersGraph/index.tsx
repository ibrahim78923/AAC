import dynamic from 'next/dynamic';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { totalOptionsBar, totalSeriesBar } from './PipelineUsersGraph.data';
import { styles } from '../styles';

const PipelineUsersGraph = ({ pipelineForecastUsersData }: any) => {
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
      <Box>
        <Typography
          variant="h5"
          sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
        >
          Users Analytics
        </Typography>
      </Box>
      <Box sx={styles?.chartWrapper}>
        <ReactApexChart
          options={totalOptionsBar(theme, pipelineForecastUsersData)}
          series={totalSeriesBar(pipelineForecastUsersData)}
          type="bar"
          height={400}
        />
      </Box>
    </Box>
  );
};

export default PipelineUsersGraph;
