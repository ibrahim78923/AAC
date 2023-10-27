import React from 'react';

import { Box } from '@mui/material';
import UserDetailCard from '../../UserDetailCard';
import { styles } from './ChatCalling.style';

const ChatCalling = ({ activeMessageData }: any) => {
  return (
    <Box>
      <UserDetailCard
        image={activeMessageData?.userProfile}
        name={activeMessageData?.userName}
        phone={activeMessageData?.userPhone}
      />
      <Box sx={styles.chatAreaWrapper}></Box>
      <Box sx={styles.chatFooter}></Box>
    </Box>
  );
};

export default ChatCalling;
