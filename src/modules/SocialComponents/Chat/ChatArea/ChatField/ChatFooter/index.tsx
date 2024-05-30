import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  useTheme,
  TextField,
  Popover,
  Typography,
  CircularProgress,
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
import { generateImage } from '@/utils/avatarUtils';
import { v4 as uuidv4 } from 'uuid';

const ChatFooter = ({ handleScrollToBottom }: any) => {
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
  const [isMessageLoading, setIsMessageLoading] = useState(false);

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

  const isLink = (text: any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  };

  const setAddMessageHandler = () => {
    setIsMessageLoading(true);
    const addMessagePayloadFrGroup = {
      chatId: activeChatId && activeChatId,
      content: messageText,
    };
    const addMessagePayload = {
      receiverId: activeReceiverId && activeReceiverId[0],
      chatId: activeChatId && activeChatId,
      content: messageText,
      media: imageToUpload,
      ...(imageToUpload?.length > 0 && { type: attachmentType }),
      ...(imageToUpload?.length <= 0 && {
        type: isLink(messageText) ? 'link' : 'text',
      }),
    };
    const addMessageReplyPayload = {
      receiverId: activeReceiverId && activeReceiverId[0],
      chatId: activeChatId && activeChatId,
      content: messageText,
      parentMessage: activeReply?.chatId,
      media: imageToUpload,
      ...(imageToUpload?.length > 0 && {
        type: attachmentType ?? isLink(messageText) ? 'link' : 'text',
      }),
      ...(imageToUpload?.length <= 0 && {
        type: isLink(messageText) ? 'link' : 'text',
      }),
    };
    socket.emit(
      'add-message',
      activeReply?.content
        ? chatMode === 'groupChat'
          ? addMessagePayloadFrGroup
          : addMessageReplyPayload
        : addMessagePayload,
      () => {
        setMessageText('');
        setImageToUpload([]);
        dispatch(setActiveReply({}));
        setIsMessageLoading(false);
        handleScrollToBottom();
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

  const [chatAttachmentUpload, { isLoading }] =
    useChatAttachmentUploadMutation();

  const handleImage = async (e: any) => {
    e.preventDefault();
    handleCloseAttachment();
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

        {imageToUpload?.length > 0 && (
          <Box sx={styles?.chatReply(theme)}>
            <Box
              sx={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setImageToUpload([])}
            >
              <CloseModalIcon />
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {imageToUpload?.map((item: any) => (
                <Box key={uuidv4()}>
                  {attachmentType === 'docs' ? (
                    <Box
                      sx={{
                        backgroundColor: theme?.palette?.primary?.light,
                        p: 1,
                        pl: 2,
                        pr: 3,
                      }}
                    >
                      <Typography variant="body2">
                        {item?.orignalName}
                      </Typography>
                    </Box>
                  ) : (
                    <Image
                      src={generateImage(item?.url)}
                      width={100}
                      height={100}
                      alt="attachments"
                      style={{ borderRadius: '8px' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={styles?.chatFooter}>
          {isLoading ? (
            <CircularProgress color="success" size={20} />
          ) : (
            <Button
              sx={styles?.unStyledButton}
              aria-describedby={idOpen}
              onClick={handleClickAttachment}
            >
              <AttachmentIcon />
            </Button>
          )}

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
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    hidden
                    type="file"
                    id="upload-button"
                    multiple
                    accept={
                      attachmentType === 'docs'
                        ? 'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf'
                        : 'image/*'
                    }
                    onChange={(e: any) => handleImage(e)}
                  />
                </form>

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
            sx={styles?.chatTextarea(theme)}
            value={messageText}
            onChange={(e) => setMessageText(e?.target?.value)}
            onInput={() => handleTypingStart()}
            onBlur={() => handleTypingStop()}
            onKeyPress={(e: any) => {
              if (e?.key === 'Enter') {
                setAddMessageHandler();
              }
            }}
          />
          <Button
            sx={styles?.unStyledButton}
            aria-describedby={id}
            onClick={handleClick}
          >
            <StickerIcon />
          </Button>
          {isMessageLoading ? (
            <CircularProgress color="success" size={20} />
          ) : (
            <Button sx={styles?.unStyledButton} onClick={setAddMessageHandler}>
              <PostIcon />
            </Button>
          )}
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
