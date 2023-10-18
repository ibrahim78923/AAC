import React from 'react';

import { Box, Button, useTheme, TextField, Popover } from '@mui/material';

import EmojiPickerComponent from './EmojiPicker';

import { useChatFooter } from './useChatFooter';

import { AttachmentIcon, PostIcon, StickerIcon } from '@/assets/icons';

import { styles } from './ChatFooter.style';

const ChatFooter = () => {
  const theme = useTheme();

  const {
    anchorEl,
    setAnchorEl,
    messageText,
    setMessageText,
    handleClick,
    handleEmojiSelect,
    open,
    id,
  } = useChatFooter({});

  return (
    <Box sx={{ padding: '30px' }}>
      <Box sx={styles.chatFooter(theme)}>
        <Button sx={styles.unStyledButton}>
          <AttachmentIcon />
        </Button>
        <TextField
          placeholder="Write message"
          sx={styles.chatTextarea}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button
          sx={styles.unStyledButton}
          aria-describedby={id}
          onClick={handleClick}
        >
          <StickerIcon />
        </Button>
        <Button sx={styles.unStyledButton}>
          <PostIcon />
        </Button>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
      </Popover>
    </Box>
  );
};

export default ChatFooter;
