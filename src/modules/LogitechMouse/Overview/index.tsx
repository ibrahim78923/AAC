import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { styles } from './Overview.style';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';
import { overviewData, utilizablewData } from './Overview.data';

const Overview = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container sx={{ pl: { md: '48px', xs: '0px' } }}>
        <Grid item xs={12}>
          <Typography sx={styles.overviewTitleText}>
            Services Properties
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            ...styles.servicesGridContainer,
            mt: '16px',
            p: { lg: '24px', xs: '14px' },
          }}
        >
          <Grid item lg={2} xs={6}>
            {overviewData.map((item, index) => (
              <Typography
                key={uuidv4()}
                sx={{
                  ...styles.overviewTextType,
                  mt: index === 0 ? '0px' : '24px',
                  color: theme.palette.grey[600],
                }}
              >
                {item.title}
              </Typography>
            ))}
          </Grid>
          <Grid item lg={6} xs={6}>
            {overviewData.map((item, index) => (
              <Typography
                key={uuidv4()}
                sx={{
                  ...styles.overviewTextDetails,
                  mt: index === 0 ? '0px' : '24px',
                }}
              >
                {item.value}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: '32px' }}>
        <Divider sx={{ bgcolor: '#E5E7EB', height: '1px' }} />
      </Grid>
      <Grid container sx={{ pl: { md: '48px', xs: '0px' } }}>
        <Grid item xs={12}>
          <Typography sx={styles.overviewTitleText}>Utilizable</Typography>
        </Grid>
        <Grid
          container
          sx={{
            ...styles.servicesGridContainer,
            mt: '16px',
            p: { lg: '24px', xs: '14px' },
            mb: '134px',
          }}
        >
          <Grid item lg={2} xs={6}>
            {utilizablewData.map((utilitem, index) => (
              <Typography
                key={uuidv4()}
                sx={{
                  ...styles.overviewTextType,
                  mt: index === 0 ? '0px' : '16px',
                }}
              >
                {utilitem.title}
              </Typography>
            ))}
          </Grid>
          <Grid item lg={6} xs={6}>
            {utilizablewData.map((utiliitem, index) => (
              <Typography
                key={uuidv4()}
                sx={{
                  ...styles.overviewTextDetails,
                  mt: index === 0 ? '0px' : '16px',
                }}
              >
                {utiliitem.value}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Overview;
