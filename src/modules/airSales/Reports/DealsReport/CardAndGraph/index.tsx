import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

import { options, optionsBar, series, seriesBar } from './CardAndGraph.data';

import { styles } from './CardAndGraph.style';
import { dealsDataByResponse } from '@/modules/airSales/Reports/Reports.data';

const CardAndGraphs = () => {
  const theme = useTheme<Theme>();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  const totalDeals = dealsDataByResponse?.data?.res?.map(
    (item: any) => item?.totalDeals,
  );
  const openDeals = dealsDataByResponse?.data?.res?.map(
    (item: any) => item?.totalOpenDeals,
  );
  const closeDeals = dealsDataByResponse?.data?.res?.map(
    (item: any) => item?.totalCloseDeals,
  );
  const dealsInPercentage = dealsDataByResponse?.data?.res;

  const dealsGraphData = dealsDataByResponse?.data?.resByMonth;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Box sx={styles?.totalDeals(theme)}>
            <Typography
              variant="h6"
              sx={{ color: `${theme?.palette?.slateBlue.main}` }}
            >
              Total Deals
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: `${theme?.palette?.common.black}`, fontWeight: 500 }}
            >
              {totalDeals}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={styles?.openDeals(theme)}>
            <Typography
              variant="h6"
              sx={{ color: `${theme?.palette?.slateBlue.main}` }}
            >
              Open Deals
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: `${theme?.palette?.common.black}`, fontWeight: 500 }}
            >
              {openDeals}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={styles?.closeDeals(theme)}>
            <Typography
              variant="h6"
              sx={{ color: `${theme?.palette?.slateBlue.main}` }}
            >
              Close Deals
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: `${theme?.palette?.common.black}`, fontWeight: 500 }}
            >
              {closeDeals}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
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
                Deals Analytics
              </Typography>
            </Box>
            <ReactApexChart
              options={optionsBar(theme)}
              series={seriesBar(dealsGraphData)}
              type="bar"
              height={290}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box sx={styles?.pieChart(theme)}>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
              >
                Deals Analytics
              </Typography>
            </Box>
            <ReactApexChart
              options={options(theme)}
              series={series(dealsInPercentage)}
              type="pie"
              width={450}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CardAndGraphs;
