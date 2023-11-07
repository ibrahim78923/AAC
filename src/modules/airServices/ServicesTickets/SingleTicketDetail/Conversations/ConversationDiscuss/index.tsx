import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Box, Drawer, useTheme } from '@mui/material';
import { stepsDiscuss } from '../Conversation.data';
import { styles } from '../Conversation.styles';

const ConversationDiscuss = ({ resetSelectedItem }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    resetSelectedItem();
  };
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleCloseDrawer}
      PaperProps={{ style: { background: 'transparent' } }}
    >
      <ThemeProvider theme={styles?.selectDiscuss(theme)}>
        <Box marginTop={'390px'}>
          <ChatBot
            steps={stepsDiscuss}
            headerTitle="Air Apple Cart (Discuss)"
          />
        </Box>
      </ThemeProvider>
    </Drawer>
  );
};

export default ConversationDiscuss;
