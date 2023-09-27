import React from 'react';
import { Box, Grid, Skeleton, useTheme } from '@mui/material';
import { style } from './SkeletonForm.style';

function SkeletonForm() {
  const theme: any = useTheme();
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
      <Grid item xs={12} sm={12}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={70}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box sx={style.boxStyle}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={70}
            sx={style.root(theme)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SkeletonForm;
