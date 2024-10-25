// import dynamic from 'next/dynamic';
import { Box, Theme, Typography, useTheme } from '@mui/material';
// all commented code is for future use
const CategoryUsersGraph = () => {
  // { activeCard, pipelineForecastData }: any
  // const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  //   ssr: false,
  // });
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
          User Analytics
        </Typography>
      </Box>
      {/* <ReactApexChart
        options={cardWiseOptions(activeCard, pipelineForecastData)}
        series={cardWiseSeries(activeCard, pipelineForecastData)}
        type="bar"
        height={800}
      /> */}
      <Box display="flex" justifyContent="center">
        <Typography
          variant="body4"
          fontWeight={600}
          sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
        >
          Total revenue goal
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryUsersGraph;
