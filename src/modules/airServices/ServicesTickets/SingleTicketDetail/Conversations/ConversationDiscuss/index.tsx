import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Box, Drawer } from '@mui/material';

export const script = [{ id: 'msg01', message: ' ' }];

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#38CAB5',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#38CAB5',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: 'Hello Kashif',
    end: true,
  },
];

const ConversationDiscuss = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleCloseDrawer}
      PaperProps={{ style: { background: 'transparent' } }}
    >
      <ThemeProvider theme={theme}>
        <Box marginTop={'390px'}>
          <ChatBot steps={steps} headerTitle="Air Apple Cart (Discuss)" />
        </Box>
      </ThemeProvider>
    </Drawer>
  );
};

export default ConversationDiscuss;
