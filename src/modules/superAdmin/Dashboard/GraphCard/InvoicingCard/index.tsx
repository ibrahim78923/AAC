import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import { Box, Typography, Theme, useTheme, Grid } from '@mui/material';

const InvoicingCard = () => {
  const theme = useTheme<Theme>();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const [series] = useState([146.1]);
  const [options] = useState<any>({
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0,
        gradientToColors: [
          `${theme.palette.error.main}`,
          `${theme?.palette?.custom.bright}`,
          `${theme?.palette?.success.main}`,
        ],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 200],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Total Revenue'],
  });

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography
              variant="body2"
              sx={{
                color: `${theme?.palette?.grey[800]}`,
                fontWeight: 600,
                paddingBottom: '1rem',
              }}
            >
              Invoicing
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: `${theme?.palette?.custom.main}`,
                    }}
                  >
                    Invoice paid
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: `${theme?.palette?.success.main}` }}
                  >
                    £ 50.3k
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: `${theme?.palette?.custom.main}`,
                    }}
                  >
                    Follow up soon
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: `${theme?.palette?.custom.bright}` }}
                  >
                    £ 54.1k
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: `${theme?.palette?.custom.main}`,
                    }}
                  >
                    Follow up now
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: `${theme.palette.error.main}` }}
                  >
                    £ 41.8k
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              background:
                'linear-gradient(236.18deg, #EBFAF8 -12.81%, rgba(235, 250, 248, 0) 104.87%)',
            }}
          >
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={230}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoicingCard;
