import React from 'react';
import { Grid } from '@mui/material';
import { CustomGridWithCardContent } from './CustomGridWithCardContent';
import { TASK_TABS_TYPES } from '@/constants';

const GridView = ({ data, tabValue }: any) => {
  const pendingTasks =
    data &&
    data?.filter((task: any) => task?.status === TASK_TABS_TYPES?.PENDING);
  const InprogressTasks =
    data &&
    data?.filter((task: any) => task?.status === TASK_TABS_TYPES?.INPROGRESS);
  const completedTasks =
    data &&
    data?.filter((task: any) => task?.status === TASK_TABS_TYPES?.COMPLETE);

  return (
    <Grid container spacing={3}>
      <CustomGridWithCardContent
        title={'All'}
        data={tabValue === '' ? data : []}
      />
      <CustomGridWithCardContent
        title={'Pending'}
        data={
          tabValue === TASK_TABS_TYPES?.PENDING || tabValue === ''
            ? pendingTasks
            : []
        }
      />
      <CustomGridWithCardContent
        title={'Inprogress'}
        data={
          tabValue === TASK_TABS_TYPES?.INPROGRESS || tabValue === ''
            ? InprogressTasks
            : []
        }
      />
      <CustomGridWithCardContent
        title={'Completed'}
        data={
          tabValue === TASK_TABS_TYPES?.COMPLETE || tabValue === ''
            ? completedTasks
            : []
        }
      />
    </Grid>
  );
};

export default GridView;
