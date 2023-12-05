import React from 'react';
import { Grid } from '@mui/material';
import RolesView from '../RolesView';
import { rolesViewData } from '../RolesView/RolesView.data';
import { v4 as uuidv4 } from 'uuid';
const RolesCards = () => {
  return (
    <Grid container spacing={2}>
      {rolesViewData?.map((roleData) => (
        <Grid item key={uuidv4()} xs={12} xl={4}>
          <RolesView roleData={roleData} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RolesCards;
