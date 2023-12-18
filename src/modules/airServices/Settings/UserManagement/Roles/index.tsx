import { Box, Grid } from '@mui/material';
import React from 'react';
import RolesCards from './RolesCards';
import { RolesHeader } from './RolesHeader';

export const Roles = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <RolesHeader />
        <Box mt={2}>
          <RolesCards />
        </Box>
      </Grid>
    </Grid>
  );
};
