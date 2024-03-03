import React from 'react';
import { Grid } from '@mui/material';
import { GridViewI } from './GridView.interface';
import { CustomGridWithCardContent } from './CustomGridWithCardContent';

const GridView = ({ data }: GridViewI) => {
  return (
    <Grid container spacing={3}>
      <CustomGridWithCardContent title={'All'} data={data} />
      <CustomGridWithCardContent title={'Pending'} data={data} />
      <CustomGridWithCardContent title={'Inprogress'} data={data} />
      <CustomGridWithCardContent title={'Completed'} data={data} />
    </Grid>
  );
};

export default GridView;
