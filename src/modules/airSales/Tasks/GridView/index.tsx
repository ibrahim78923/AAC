import React from 'react';
import { Grid } from '@mui/material';
import { GridViewI } from './GridView.interface';
import { CustomGridWithCardContent } from './CustomGridWithCardContent';

const GridView = ({ data }: GridViewI) => {
  const pendingTasks =
    data && data?.filter((task) => task?.status === 'Pending');
  const InprogressTasks =
    data && data?.filter((task) => task?.status === 'Inprogress');
  const completedTasks =
    data && data?.filter((task) => task?.status === 'Complete');

  return (
    <Grid container spacing={3}>
      <CustomGridWithCardContent title={'All'} data={data} />
      <CustomGridWithCardContent title={'Pending'} data={pendingTasks} />
      <CustomGridWithCardContent title={'Inprogress'} data={InprogressTasks} />
      <CustomGridWithCardContent title={'Completed'} data={completedTasks} />
    </Grid>
  );
};

export default GridView;
