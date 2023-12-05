import { NoAssociationFoundImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
// import ReactApexChart from 'react-apexcharts';
import useAnalyze from '../../useAnalyze';
import { style } from '../../Analyze.style';

const HighCostPerClickChart = () => {
  const { theme } = useAnalyze();
  return (
    <Card sx={{ p: '24px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            color: `${theme?.palette?.slateBlue?.main}`,
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Compaigns with high cost per click
        </Typography>
        <Button
          variant="outlined"
          className="small"
          sx={{
            border: 'none',
            '&:hover': {
              border: 'none',
            },
          }}
        >
          Save
        </Button>
      </Box>
      <Box height="350px" sx={style?.chartTitle}>
        {/* <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        /> */}
        <NoData
          image={NoAssociationFoundImage}
          message={
            'There is no data to show this time frame. Try changing the data range'
          }
        />
      </Box>
      {/* <Typography variant='body2' fontWeight={600} color={theme?.palette?.slateBlue?.main} textAlign='center'>Session Data</Typography> */}
    </Card>
  );
};

export default HighCostPerClickChart;
