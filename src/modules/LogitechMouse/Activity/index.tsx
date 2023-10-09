import React from 'react';
import { Grid, Typography, Button, Box, Divider } from '@mui/material';
import Image from 'next/image';
import { exportImage, editImage } from '@/assets/images';
import { activityStyles } from './Activity.style';
import { activities } from './Activity.data';
import { v4 as uuidv4 } from 'uuid';

const Activity = () => {
  return (
    <Grid container sx={{ pb: '302px' }}>
      <Grid item xs={12} sx={{ mb: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              ...activityStyles.exportBtn,
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.09)',
              },
              color: 'black',
            }}
            disableElevation
            variant="contained"
            startIcon={
              <Image
                src={exportImage}
                alt="Export"
                width="18px"
                height="18px"
              />
            }
          >
            Export
          </Button>
        </div>
      </Grid>
      {activities.map((activity: ActivityData) => (
        <Grid
          container
          key={uuidv4()}
          sx={{ mb: '16px', ml: { lg: '71px', xs: '0px' } }}
        >
          {/* First Grid within the Container Grid */}
          <Grid item lg={2} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ ...activityStyles.activityTimeDetails }}>
                {activity.timestamp}
              </Typography>
              <Image src={editImage} alt="Edit" width="18px" height="18px" />
            </Box>
          </Grid>

          {/* Second Grid within the Container Grid */}
          <Grid item lg={10} xs={12}>
            <Typography
              sx={{
                ...activityStyles.activityDetails,
                ml: { lg: '16px', xs: '0px' },
              }}
            >
              <span style={{ color: 'var(--primary-primary, #38CAB5)' }}>
                {' '}
                John Deo
              </span>{' '}
              created the asset Logitech Mouse with Asset Tag as ASSET-3,
              Workspace as
              <br /> IT, Impact as Low, Asset type as Consumable and End Of
              Life.
            </Typography>
          </Grid>

          <Grid
            container
            item
            lg={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: '16px' }}
          >
            <Box
              sx={{ display: { lg: 'flex', xs: 'none' }, alignItems: 'center' }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  borderRadius: '20px',
                  background: '#D7F4F0',
                  width: '4px',
                  height: '49px',
                  mr: '16px',
                  mb: '16px',
                }}
              />
            </Box>
          </Grid>

          <Grid lg={10} sx={{ mt: '16px' }}></Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Activity;
