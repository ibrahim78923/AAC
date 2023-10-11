import React from 'react';

import { Box, Divider, Grid, Typography, Theme, useTheme } from '@mui/material';

import {
  BlueDotIcon,
  EarningIcon,
  RedDotIcon,
  TwoUserIcon,
  UserGroupFilledIcon,
} from '@/assets/icons';

import { style } from './StatusCard.style';

const StatusCards = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Grid container spacing={2} sx={{ paddingBottom: '1rem' }}>
        <Grid item xl={2.6} lg={3} md={6} sm={6} xs={12}>
          <Box sx={style.TotalCardStyle(theme)}>
            <Box sx={{ display: 'grid' }}>
              <UserGroupFilledIcon />
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                  fontWeight: 400,
                }}
              >
                Total Clients
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: `${theme?.palette?.custom.main}`,
                  fontWeight: 500,
                }}
              >
                95
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ border: '2px solid #4CCFBC', borderRadius: '20px' }}
            />
            <Box
              sx={{
                paddingRight: {
                  lg: '2.3rem',
                  md: '0rem',
                  sm: '3.3rem',
                  xs: '0rem',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                }}
              >
                <BlueDotIcon />
                &nbsp; Active
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.slateBlue?.main}`,
                  marginLeft: '0.8rem',
                }}
              >
                60
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                }}
              >
                <RedDotIcon />
                &nbsp; In Active
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.slateBlue?.main}`,
                  marginLeft: '0.8rem',
                }}
              >
                20
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={2.6} lg={3} md={6} sm={6} xs={12}>
          <Box sx={style.TotalCardStyle(theme)}>
            <Box>
              <TwoUserIcon />
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                  fontWeight: 400,
                }}
              >
                Total Users
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: `${theme?.palette?.custom.main}`,
                  fontWeight: 500,
                }}
              >
                95
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ border: '2px solid #4CCFBC', borderRadius: '20px' }}
            />
            <Box
              sx={{
                paddingRight: {
                  lg: '2.3rem',
                  md: '0rem',
                  sm: '3.3rem',
                  xs: '0rem',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                }}
              >
                <BlueDotIcon />
                &nbsp; Active
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.slateBlue?.main}`,
                  marginLeft: '0.8rem',
                }}
              >
                60
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                }}
              >
                <RedDotIcon />
                &nbsp; In Active
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.slateBlue?.main}`,
                  marginLeft: '0.8rem',
                }}
              >
                20
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={6.8} lg={6} md={12} sm={6} xs={12}>
          <Box sx={style.EarningCardStyle(theme)}>
            <Box sx={{ marginTop: '1rem' }}>
              <EarningIcon />
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.blue?.light}`,
                  fontWeight: 400,
                }}
              >
                Earnings
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                border: `2px solid ${theme?.palette?.success.main}`,
                borderRadius: '20px',
                marginRight: '12px',
                marginLeft: '3rem',
              }}
            />
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#79839E' }}>
                    Current Month
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: `${theme?.palette?.blue.dull_blue}`,
                      fontWeight: 600,
                    }}
                  >
                    £ 268
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#79839E' }}>
                    Last Month
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: `${theme?.palette?.blue.dull_blue}`,
                      fontWeight: 600,
                    }}
                  >
                    £ 450
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#79839E' }}>
                    Current Year
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: `${theme?.palette?.blue.dull_blue}`,
                      fontWeight: 600,
                    }}
                  >
                    £ 1280
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#79839E' }}>
                    Last Year
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: `${theme?.palette?.blue.dull_blue}`,
                      fontWeight: 600,
                    }}
                  >
                    £ 11,250
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StatusCards;
