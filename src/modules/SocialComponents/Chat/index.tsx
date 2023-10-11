import React from 'react';

import { Box, Grid } from '@mui/material';

import Contacts from './Contacts';

import ChatArea from './ChatArea';

import { styles } from './Chat.style';

const Chat = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Box sx={styles.leftWrapper}>
            <Contacts />
          </Box>
        </Grid>
        <Grid item lg={9}>
          <Box sx={styles.rightWrapper}>
            <ChatArea />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
