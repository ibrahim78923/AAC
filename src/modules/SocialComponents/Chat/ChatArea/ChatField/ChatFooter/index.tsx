import React, { useState } from 'react';

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
  DocumentIcon,
  ImageIconAttachment,
  PostIcon,
  StickerIcon,
} from '@/assets/icons';

import { styles } from './ChatFooter.style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setActiveReply } from '@/redux/slices/chat/slice';

import { TypingGif, UserDefault } from '@/assets/images';

import { getSession } from '@/utils';
import { useChatAttachmentUploadMutation } from '@/services/chat';

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

  const [imageToUpload, setImageToUpload] = useState([]);
  const [attachmentType, setAttachmentType] = useState('');

  const activeChatId = useAppSelector((state) => state?.chat?.activeChatId);
  const activeReply = useAppSelector((state) => state?.chat?.activeReply);
  const chatMode = useAppSelector(
    (state) => state?.chat?.chatModeState?.chatModeState,
  );
  const activeReceiverId = useAppSelector(
    (state) => state?.chat?.activeReceiverId,
  );

  const [anchorElAttachment, setAnchorElAttachment] =
    useState<HTMLButtonElement | null>(null);

  const handleClickAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorElAttachment(event?.currentTarget);
  };
  const handleCloseAttachment = () => {
    setAnchorElAttachment(null);
  };
  const open = Boolean(anchorElAttachment);
  const idOpen = open ? 'simple-popover' : undefined;

  const setAddMessageHandler = () => {
    const addMessagePayloadFrGroup = {
      chatId: activeChatId && activeChatId,
      content: messageText,
    };
    const addMessagePayload = {
      receiverId: activeReceiverId && activeReceiverId[0],
      chatId: activeChatId && activeChatId,
      content: messageText,
      media: imageToUpload,
      ...(imageToUpload.length > 0 && { type: attachmentType ?? 'text' }),
    };
    const addMessageReplyPayload = {
      receiverId: activeReceiverId && activeReceiverId[0],
      chatId: activeChatId && activeChatId,
      content: messageText,
      parentMessage: activeReply?.chatId,
      media: imageToUpload,
      ...(imageToUpload.length > 0 && { type: attachmentType ?? 'text' }),
    };

    socket.emit(
      'add-message',
      activeReply?.content
        ? chatMode === 'groupChat'
          ? addMessagePayloadFrGroup
          : addMessageReplyPayload
        : addMessagePayload,
      (response: any) => {
        setMessageText('');
        setImageToUpload([]);
        dispatch(setActiveReply({}));
        setChangeScroll(response?.data);
      },
    );
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

  const [chatAttachmentUpload] = useChatAttachmentUploadMutation();

  const handleImage = async (e: any) => {
    const formData = new FormData();
    for (let i = 0; i < e?.target?.files?.length; i++) {
      formData.append('media', e?.target?.files[i]);
    }
    try {
      const response = await chatAttachmentUpload({
        media: formData,
      })?.unwrap();
      setImageToUpload(response?.data);
    } catch (error: any) {}
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
          <Button
            sx={styles?.unStyledButton}
            aria-describedby={idOpen}
            onClick={handleClickAttachment}
          >
            <AttachmentIcon />
          </Button>

          <Popover
            id={idOpen}
            open={open}
            anchorEl={anchorElAttachment}
            onClose={handleCloseAttachment}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Box sx={{ padding: '20px' }}>
              <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Select Attachment Type
              </Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <input
                  hidden
                  type="file"
                  id="upload-button"
                  multiple
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                            text/plain, application/pdf, image/*"
                  onChange={(e: any) => handleImage(e)}
                />
                <label
                  htmlFor="upload-button"
                  style={styles?.customButtons(theme)}
                  onClick={() => {
                    setAttachmentType('image');
                  }}
                >
                  <ImageIconAttachment />
                  &nbsp; Image
                </label>
                <label
                  htmlFor="upload-button"
                  style={styles?.customButtons(theme)}
                  onClick={() => {
                    setAttachmentType('docs');
                  }}
                >
                  <DocumentIcon color={theme?.palette?.common?.white} />
                  &nbsp; Document
                </label>
              </Box>
            </Box>
          </Popover>

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
