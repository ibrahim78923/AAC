import React from 'react';
import { Box, Divider, Grid, Typography, Skeleton } from '@mui/material';
import {
  BlueDotIcon,
  EarningIcon,
  RedDotIcon,
  TwoUserIcon,
  UserGroupFilledIcon,
} from '@/assets/icons';
import { style } from './StatusCard.style';
import { statusCardsI } from '@/modules/superAdmin/Dashboard/Dashboard-interface';
import useDashboard from '@/modules/superAdmin/Dashboard/useDashboard';

const StatusCards = ({
  isLoading,
  data,
  totalClients,
  totalUsers,
  billingDataLoading,
  billingData,
}: statusCardsI) => {
  const { theme } = useDashboard();
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
        {isLoading ? (
          <Grid item xl={3} md={6} xs={12}>
            <Skeleton height="200px" />
          </Grid>
        ) : (
          <Grid item xl={3} md={6} xs={12}>
            <Box sx={style?.TotalClientStyle(theme)}>
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
                    color: `${theme?.palette?.custom?.main}`,
                    fontWeight: 500,
                  }}
                >
                  {totalClients}
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  border: `2px solid ${theme?.palette?.primary?.main}`,
                  borderRadius: '20px',
                }}
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
                  {data?.activeClientCount}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: `${theme?.palette?.blue?.light}`,
                  }}
                >
                  <RedDotIcon />
                  &nbsp; Inactive
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    color: `${theme?.palette?.slateBlue?.main}`,
                    marginLeft: '0.8rem',
                  }}
                >
                  {data?.inactiveClientCount}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
        {isLoading ? (
          <Grid item xl={3} md={6} xs={12}>
            <Skeleton height="200px" />
          </Grid>
        ) : (
          <Grid item xl={3} md={6} xs={12}>
            <Box sx={style?.TotalUserStyle(theme)}>
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
                    color: `${theme?.palette?.custom?.main}`,
                    fontWeight: 500,
                  }}
                >
                  {totalUsers}
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  border: `2px solid ${theme?.palette?.custom?.turquoise_Blue}`,
                  borderRadius: '20px',
                }}
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
                  {data?.activeUserCount}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: `${theme?.palette?.blue?.light}`,
                  }}
                >
                  <RedDotIcon />
                  &nbsp; Inactive
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    color: `${theme?.palette?.slateBlue?.main}`,
                    marginLeft: '0.8rem',
                  }}
                >
                  {data?.inactiveUserCount}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
        {billingDataLoading ? (
          <Grid item xl={6} md={12} xs={12}>
            <Skeleton height="200px" />
          </Grid>
        ) : (
          <Grid item xl={6} md={12} xs={12}>
            <Box sx={style?.EarningCardStyle(theme)}>
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
                  border: `2px solid ${theme?.palette?.success?.main}`,
                  borderRadius: '20px',
                  marginRight: '12px',
                  marginLeft: '3rem',
                }}
              />
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: `${theme?.palette?.custom?.steel_blue_alpha}`,
                      }}
                    >
                      Current Month
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${theme?.palette?.blue?.dull_blue}`,
                        fontWeight: 600,
                      }}
                    >
                      {`£ ${billingData?.earningThisMonth?.totalNetAmount}`}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: `${theme?.palette?.custom?.steel_blue_alpha}`,
                      }}
                    >
                      Last Month
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${theme?.palette?.blue?.dull_blue}`,
                        fontWeight: 600,
                      }}
                    >
                      {`£ ${billingData?.earningLastMonth?.totalNetAmount}`}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: `${theme?.palette?.custom?.steel_blue_alpha}`,
                      }}
                    >
                      Current Year
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${theme?.palette?.blue?.dull_blue}`,
                        fontWeight: 600,
                      }}
                    >
                      {`£ ${Number(
                        billingData?.earningThisYear?.totalNetAmount,
                      )?.toFixed(2)}`}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: `${theme?.palette?.custom?.steel_blue_alpha}`,
                      }}
                    >
                      Last Year
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${theme?.palette?.blue?.dull_blue}`,
                        fontWeight: 600,
                      }}
                    >
                      {`£ ${Number(
                        billingData?.earningLastYear?.totalNetAmount,
                      )?.toFixed(2)}`}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default StatusCards;
