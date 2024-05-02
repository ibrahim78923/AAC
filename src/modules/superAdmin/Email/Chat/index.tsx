import React from 'react';
import { Grid } from '@mui/material';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

const EmailChat = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <LeftPane />
        </Grid>
        <Grid item md={8} xs={12}>
          <RightPane />
        </Grid>
      </Grid>
    </>
  );
};

export default EmailChat;
