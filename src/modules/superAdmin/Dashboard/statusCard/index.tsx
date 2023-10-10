import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { BlueDotIcon, RedDotIcon, UserGroupFilledIcon } from '@/assets/icons';
import { UnionBgImage } from '@/assets/images';

const StatusCards = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={2.6} md={3.5} sm={6} xs={12}>
          <Box
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              background: '#ffff',
              padding: '1rem',
              backgroundImage: `url(${UnionBgImage.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <UserGroupFilledIcon />
              <Typography>Total Clients</Typography>
              <Typography>95</Typography>
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
                  lg: '3.3rem',
                  md: '0rem',
                  sm: '3.3rem',
                  xs: '0rem',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  color: '#4C597D',
                }}
              >
                <BlueDotIcon /> Active
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#374151',
                }}
              >
                {' '}
                60
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  color: '#4C597D',
                }}
              >
                <RedDotIcon /> In Active
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#374151',
                }}
              >
                20
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          2
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          3
        </Grid>
      </Grid>
      <Box></Box>
    </>
  );
};

export default StatusCards;
