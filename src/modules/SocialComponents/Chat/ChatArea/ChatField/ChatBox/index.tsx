import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';

import {
  CharmTickIcon,
  DownloadRoundedIcon,
  PaperClipIcon,
  ReplyIcon,
  ThreeDotsIcon,
} from '@/assets/icons';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setActiveReply } from '@/redux/slices/chat/slice';

import { UserDefault } from '@/assets/images';
import { getSession } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

import { styles } from '../ChatField.style';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const ChatBox = ({
  item,
  chatMode,
  setActiveChat,
  customEmojis,
  activeChat,
  role,
}: any) => {
  const theme = useTheme();

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();

  const socket = useAppSelector((state) => state?.chat?.socket);

  const handelSendReaction = (emoji: any, item: any) => {
    const isReactionExists = item?.reactions?.some(
      (reaction: any) => reaction?.userId === user?._id,
    );
    // update with socket on
    socket.emit(
      'update-message',
      {
        updateReaction: isReactionExists > 0 ? true : false,
        messageId: item?._id,
        reaction: {
          userId: user?._id,
          userReaction: emoji,
        },
      },
      () => {
        // dispatch(setChatMessages(response?.data));
      },
    );
  };

  const handelReply = (chatId: any) => {
    dispatch(
      setActiveReply({
        chatId: chatId,
        content: item?.content,
      }),
    );
  };

  const handelDelete = () => {
    socket.emit(
      'update-message',
      {
        messageId: item?._id,
        isDeleted: true,
      },
      // (response: any) => {
      //   console.log('response', response?.data);
      // },
    );
  };

  useEffect(() => {
    if (role === 'receiver') {
      if (item?.isRead === false) {
        socket.emit(
          'update-message',
          {
            messageId: item?._id,
            isRead: true,
          },
          // (response: any) => {
          //   console.log('response', response?.data);
          // },
        );
      }
    }
  }, [item]);

  const divToCopyRef = useRef<any>(null);

  const handleCopyClick = () => {
    if (divToCopyRef?.current) {
      const textToCopy = divToCopyRef?.current?.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          enqueueSnackbar('Text successfully copied to clipboard', {
            variant: 'success',
          });
          handleClose();
        })
        .catch(() => {});
    }
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Box sx={styles?.mainChatArea(role)}>
        <Box sx={{ marginBottom: '25px' }}>
          <Image
            width={30}
            height={30}
            src={item?.userImage ?? UserDefault}
            alt="avatar"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: `${role === 'sender' ? 'flex-end' : 'flex-start'}`,
          }}
        >
          <>
            {item?.parentMessage?.content ? (
              <Box sx={styles?.chatReplyReference(role)}>
                <Typography
                  variant="body3"
                  sx={{
                    color: theme?.palette.custom?.dim_blue,
                  }}
                >
                  <ReplyIcon />
                  &nbsp;&nbsp;{item?.userName}replied to{' '}
                  {item?.parentMessage?.ownerDetail?._id === user?._id ? (
                    'You'
                  ) : (
                    <>
                      {item?.parentMessage?.ownerDetail?.firstName}&nbsp;
                      {item?.parentMessage?.ownerDetail?.lastName}
                    </>
                  )}
                </Typography>
                <Box sx={styles?.chatReplyReferenceContent}>
                  <Typography
                    variant="body3"
                    sx={{
                      color: '#9D9D9D',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item?.parentMessage?.content,
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <>
                {chatMode === 'groupChat' ? (
                  <Box>
                    <Typography
                      variant="body3"
                      sx={{ color: theme?.palette?.common, fontWeight: '500' }}
                    >
                      {item?.userName}
                    </Typography>
                  </Box>
                ) : null}
              </>
            )}
          </>
          <Box
            sx={styles?.chatMessageArea(role)}
            onMouseOver={() => setActiveChat(item?._id)}
            onMouseLeave={() => setActiveChat('')}
          >
            <Box>
              <Box sx={styles?.chatBoxWrapperInset(theme, role)}>
                {!item?.attachment?.document && (
                  <Typography
                    ref={divToCopyRef}
                    variant="body3"
                    dangerouslySetInnerHTML={{
                      __html: item?.content,
                    }}
                  />
                )}
                {item?.attachment?.images && (
                  <Box key={uuidv4()} sx={{ width: '16vw' }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        marginTop: '1px',
                        marginBottom: '2px',
                      }}
                    >
                      {item?.attachment?.images?.map((item: any) => (
                        <Grid item xs={9} sm={4} md={4} lg={4} key={uuidv4()}>
                          <Image src={item?.img} height={80} alt="media" />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                {item?.attachment?.document && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <PaperClipIcon />
                      <Typography
                        variant="body3"
                        sx={{
                          color: theme?.palette?.error?.main,
                          fontWeight: '500',
                        }}
                      >
                        {item?.attachment?.document}
                      </Typography>
                    </Box>
                    <DownloadRoundedIcon />
                  </Box>
                )}
                <Box
                  sx={{
                    position: 'absolute',
                    right: '5px',
                    bottom: '0px',
                  }}
                >
                  <CharmTickIcon isRead={item?.isRead} />
                </Box>
                {item?.reactions?.map((emoji: any) => (
                  <Box
                    key={uuidv4()}
                    sx={styles?.chatReaction}
                    dangerouslySetInnerHTML={{
                      __html: emoji?.userReaction,
                    }}
                  />
                ))}
                {item?._id === activeChat && (
                  <Box sx={styles?.sendReaction(theme)}>
                    {customEmojis?.map((emoji: any) => (
                      <Box
                        key={uuidv4()}
                        onClick={() => handelSendReaction(emoji, item)}
                        dangerouslySetInnerHTML={{
                          __html: emoji,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Box
                sx={{ textAlign: `${role === 'sender' ? 'left' : 'right'}` }}
              >
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette.custom?.dim_blue }}
                >
                  {dayjs(item?.createdAt).format(TIME_FORMAT?.UI)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '10',
                marginBottom: '20px',
              }}
            >
              <Button
                sx={styles?.unStyledButton}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <ThreeDotsIcon color={theme?.palette?.custom?.grayish_blue} />
              </Button>
              {item?._id === activeChat && (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handelReply(item?._id)}>
                    Reply
                  </MenuItem>
                  <MenuItem onClick={handelDelete}>Delete</MenuItem>
                  <MenuItem onClick={handleCopyClick}>Copy</MenuItem>
                </Menu>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
