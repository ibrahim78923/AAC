import React from 'react';

import { Box, Button, useTheme, TextField } from '@mui/material';

import { AttachmentIcon, PostIcon, StickerIcon } from '@/assets/icons';

import { styles } from './ChatFooter.style';

const ChatFooter = () => {
  const theme = useTheme();
  return (
    <Box sx={{ padding: '30px' }}>
      <Box sx={styles.chatFooter(theme)}>
        <Button sx={styles.unStyledButton}>
          <AttachmentIcon />
        </Button>
        <TextField placeholder="Write message" sx={styles.chatTextarea} />
        <Button sx={styles.unStyledButton}>
          <StickerIcon />
        </Button>
        <Button sx={styles.unStyledButton}>
          <PostIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatFooter;
