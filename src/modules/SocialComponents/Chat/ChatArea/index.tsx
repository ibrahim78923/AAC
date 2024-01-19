import React from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatField from './ChatField';
import { useAppSelector } from '@/redux/store';

const ChatArea = ({ isError }: any) => {
  const chatModeState = useAppSelector(
    (state: any) => state?.chat?.chatModeState,
  );
  const chatMode = chatModeState?.chatModeState;

  return (
    <Box>
      <ChatHeader chatMode={chatMode} />
      <ChatField isError={isError} />
    </Box>
  );
};

export default ChatArea;
