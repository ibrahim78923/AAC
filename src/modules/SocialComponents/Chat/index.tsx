import React from 'react';

import { Box, Grid } from '@mui/material';

import Contacts from './Contacts';
import ChatArea from './ChatArea';

import { styles } from './Chat.style';

const Chat = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3.5}>
          <Box sx={styles.leftWrapper}>
            <Contacts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8.5}>
          <Box sx={styles.rightWrapper}>
            <ChatArea />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
