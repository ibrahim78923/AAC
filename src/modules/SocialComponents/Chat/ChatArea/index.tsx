import React from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatField from './ChatField';

const ChatArea = () => {
  return (
    <Box>
      <ChatHeader />
      <ChatField />
    </Box>
  );
};

export default ChatArea;
