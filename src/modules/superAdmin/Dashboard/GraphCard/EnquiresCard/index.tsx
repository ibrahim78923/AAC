import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Typography, Grid } from '@mui/material';

import useEnquiriesCards from './useEnquiriesCards';

import { style } from './EnquiriesCard.style';

const EnquiriesCard = () => {
  const { series, options, theme } = useEnquiriesCards();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
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
