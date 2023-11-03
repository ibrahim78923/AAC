import React from 'react';
import { Grid } from '@mui/material';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Draft from './RightSide/Draft';
import { useChat } from './useChat';

const EmailChat = () => {
  const { currTab, leftSideData, rightSideData } = useChat();
  return (
    <Grid container spacing={2}>
      <Grid item md={4} xs={12}>
        <LeftSide {...leftSideData} />
      </Grid>
      <Grid item md={8} xs={12}>
        {currTab == 2 ? (
          <Draft />
        ) : (
          <RightSide key={'right side'} {...rightSideData} />
        )}
      </Grid>
    </Grid>
  );
};

export default EmailChat;
