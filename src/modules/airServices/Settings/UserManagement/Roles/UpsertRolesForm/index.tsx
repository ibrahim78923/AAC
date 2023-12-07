import React from 'react';
import { Grid } from '@mui/material';
import UpsertRolesForm from './use/UpsertRolesForm';
import RolesAccordions from '../RolesAccordions';

const UpsertRoles = () => {
  return (
    <>
      <Grid container>
        <UpsertRolesForm />
        <RolesAccordions />
      </Grid>
      <Grid></Grid>
    </>
  );
};

export default UpsertRoles;
