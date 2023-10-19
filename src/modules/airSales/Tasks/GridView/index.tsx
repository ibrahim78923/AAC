import React from 'react';
import { Grid } from '@mui/material';
import { GridViewI } from './GridView.interface';
import { CustomGridWithCardContent } from './CustomGridWithCardContent';

const GridView = ({
  title,
  data,
  pendingData,
  inprogressData,
  completedData,
}: GridViewI) => {
  return (
    <Grid container spacing={3}>
      <CustomGridWithCardContent title={title} data={data} />
      {title === 'All' && (
        <>
          <CustomGridWithCardContent title={'pending'} data={pendingData} />
          <CustomGridWithCardContent
            title={'inprogress'}
            data={inprogressData}
          />
          <CustomGridWithCardContent
            title={'comppleted'}
            data={completedData}
          />
        </>
      )}
    </Grid>
  );
};

export default GridView;
