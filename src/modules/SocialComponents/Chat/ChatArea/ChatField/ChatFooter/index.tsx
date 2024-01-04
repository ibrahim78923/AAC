import React from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  useTheme,
  TextField,
  Popover,
  Typography,
} from '@mui/material';

import EmojiPickerComponent from './EmojiPicker';

import { useChatFooter } from './useChatFooter';

import {
  AttachmentIcon,
  CloseModalIcon,
  PostIcon,
  StickerIcon,
} from '@/assets/icons';

import { styles } from './ChatFooter.style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setActiveReply,
  setUpdateChatContacts,
} from '@/redux/slices/chat/slice';

import { TypingGif, UserDefault } from '@/assets/images';

import { getSession } from '@/utils';

const ChatFooter = ({ setChangeScroll }: any) => {
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
  const activeReply = useAppSelector((state) => state?.chat?.activeReply);
  const activeReceiverId = useAppSelector(
    (state) => state?.chat?.activeReceiverId,
  );

  const setAddMessageHandler = () => {
    const addMessagePayload = {
      receiverId: activeReceiverId && activeReceiverId[0],
      chatId: activeChatId && activeChatId,
      content: messageText,
    };
    const addMessageReplyPayload = {
      receiverId: activeReceiverId && activeReceiverId[0],
      chatId: activeChatId && activeChatId,
      content: messageText,
      parentMessage: activeReply?.chatId,
    };

    if (chatMessages?.length > 0) {
      socket.emit(
        'add-message',
        activeReply?.content ? addMessageReplyPayload : addMessagePayload,
        (response: any) => {
          setMessageText('');
          dispatch(setActiveReply({}));
          setChangeScroll(response?.data);
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
          setChangeScroll(response?.data);
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

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const checkTypingPayload = {
    typingUserName: `${
      user?.firstName.toLowerCase() + ' ' + user?.lastName.toLowerCase()
    }`,
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

  const typingUserData = useAppSelector((state) => state?.chat?.typingUserData);

  return (
    <Box
      sx={{
        padding: '30px',
        paddingTop: `${typingUserData?.userName ? '0px' : '53px'}`,
      }}
    >
      {typingUserData?.userName ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '5px',
          }}
        >
          <Box>
            <Image width={40} height={40} src={UserDefault} alt="avatar" />
          </Box>
          <Box>
            <Typography
              sx={{ textTransform: 'lowercase' }}
              variant="body3"
              fontWeight={500}
            >
              {typingUserData?.userName}
            </Typography>
            <Box>
              <Image src={TypingGif} width={40} alt="typing" height={21} />
            </Box>
          </Box>
        </Box>
      ) : null}

      <Box sx={styles?.chatFooterWrapper(theme)}>
        {activeReply?.content && (
          <Box sx={styles?.chatReply(theme)}>
            <Typography variant="body3" fontWeight={600}>
              You
            </Typography>
            <Typography variant="body2">{activeReply?.content}</Typography>
            <Box
              sx={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(setActiveReply({}))}
            >
              <CloseModalIcon />
            </Box>
          </Box>
        )}

        <Box sx={styles?.chatFooter}>
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
