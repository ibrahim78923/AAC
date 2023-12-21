import React from 'react';

import { Box, Button, useTheme, TextField, Popover } from '@mui/material';

import EmojiPickerComponent from './EmojiPicker';

import { useChatFooter } from './useChatFooter';

import { AttachmentIcon, PostIcon, StickerIcon } from '@/assets/icons';

import { styles } from './ChatFooter.style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setUpdateChatContacts } from '@/redux/slices/chat/slice';

const ChatFooter = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const {
    anchorEl,
    setAnchorEl,
    messageText,
    setMessageText,
    handleClick,
    handleEmojiSelect,
    isOpen,
    id,
  } = useChatFooter();

  const socket = useAppSelector((state) => state?.chat?.socket);

  const chatMessages = useAppSelector((state) => state?.chat?.chatMessages);
  const activeChatId = useAppSelector((state) => state?.chat?.activeChatId);
  const activeReceiverId = useAppSelector(
    (state) => state?.chat?.activeReceiverId,
  );
  const activeParticipant = useAppSelector(
    (state) => state?.chat?.activeParticipant,
  );

  const setAddMessageHandler = () => {
    if (chatMessages?.length > 0) {
      socket.emit(
        'add-message',
        {
          receiverId: activeReceiverId && activeReceiverId[0],
          chatId: activeChatId && activeChatId,
          content: messageText,
        },
        () => {
          setMessageText('');
        },
      );
    } else {
      socket.emit(
        'add-message',
        {
          receiverId: activeReceiverId && activeReceiverId[0],
          content: messageText,
        },
        (response: any) => {
          setMessageText('');
          dispatch(
            setUpdateChatContacts({
              ownerId: response?.data?.ownerId,
              chatId: response?.data?.chatId,
            }),
          );
        },
      );
    }
  };

  const checkTypingPayload = {
    typingUserName: activeParticipant?.firstName,
    isGroup: false,
    receiverId: activeReceiverId && activeReceiverId[0],
    chatId: activeChatId,
  };

  const handleTypingStart = () => {
    socket.emit('start-typing', checkTypingPayload);
  };
  const handleTypingStop = () => {
    socket.emit('stop-typing', checkTypingPayload);
  };

  return (
    <Box sx={{ padding: '30px' }}>
      <Box sx={styles?.chatFooter(theme)}>
        <Button sx={styles?.unStyledButton}>
          <AttachmentIcon />
        </Button>
        <TextField
          placeholder="Write message"
          sx={styles?.chatTextarea}
          value={messageText}
          onChange={(e) => setMessageText(e?.target?.value)}
          onInput={() => handleTypingStart()}
          onBlur={() => handleTypingStop()}
        />
        <Button
          sx={styles?.unStyledButton}
          aria-describedby={id}
          onClick={handleClick}
        >
          <StickerIcon />
        </Button>
        <Button sx={styles?.unStyledButton} onClick={setAddMessageHandler}>
          <PostIcon />
        </Button>
      </Box>
      <Popover
        id={id}
        open={isOpen}
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
