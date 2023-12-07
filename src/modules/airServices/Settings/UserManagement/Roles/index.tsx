import { Grid } from '@mui/material';
import React from 'react';
import RolesCards from './RolesCards';

export const Roles = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <RolesCards />
      </Grid>
    </Grid>
  );
};
