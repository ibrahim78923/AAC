import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import { Box, Typography, Theme, useTheme, Grid } from '@mui/material';

import { style } from './EnquiriesCard.style';

const EnquiriesCard = () => {
  const theme = useTheme<Theme>();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const [series] = useState([65, 35]);
  const [options] = useState<any>({
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 100,
    },
    colors: [`${theme.palette.primary.main}`, `${theme.palette.error.main}`],
  });

  return (
    <>
      <Box sx={style.mainBox(theme)}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography
              variant="body2"
              sx={{ color: `${theme?.palette?.grey[800]}`, fontWeight: 600 }}
            >
              Enquires
            </Typography>
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                rowGap: '10px',
                paddingY: '1.5rem',
              }}
            >
              <Typography variant="body2" sx={style.enquryTypo}>
                Complete
                <Box sx={style.completePercent(theme)}>
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: 400,
                      color: `${theme?.palette?.common.white}`,
                    }}
                  >
                    65%
                  </Typography>
                </Box>
              </Typography>
              <Typography variant="body2" sx={style.enquryTypo}>
                Pending
                <Box sx={style.pendingPercent(theme)}>
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: 400,
                      color: `${theme?.palette?.common.white}`,
                    }}
                  >
                    35%
                  </Typography>
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={210}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EnquiriesCard;
