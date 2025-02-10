import React, { memo, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
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
import { setActiveReply, setChatContacts } from '@/redux/slices/chat/slice';

import { UserDefault } from '@/assets/images';
import { getSession } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

import { styles } from '../ChatField.style';
import dayjs from 'dayjs';
import {
  CHAT_MESSAGE_ROLES,
  CHAT_MESSAGE_TYPE,
  CHAT_TYPES,
  indexNumbers,
  TIME_FORMAT,
} from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { IMG_URL } from '@/config';
import { CHAT_SOCKETS_EMIT } from '@/routesConstants/paths';

const ChatBoxComponent = ({
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
  const activeChatId = useAppSelector((state) => state?.chat?.activeChatId);
  const activeChatState = useAppSelector((state) => state?.chat?.activeChat);

  const handelSendReaction = (emoji: any, item: any) => {
    setActiveChat('');
    const isReactionExists = item?.reactions?.some(
      (reaction: any) => reaction?.userId === user?._id,
    );
    // update with socket on
    socket.emit(
      'update-message',
      {
        updateReaction: isReactionExists > 0 ? true : false,
        messageId: item?._id,
        ...(chatMode === 'groupChat' && {
          groupId: activeChatId,
        }),
        ...(chatMode === 'groupChat' && {
          ownerDetails: {
            firstName:
              item?.ownerDetail?.firstName || item?.ownerDetails?.firstName,
            lastName:
              item?.ownerDetail?.lastName || item?.ownerDetails?.lastName,
            avatar: item?.ownerDetail?.avatar || item?.ownerDetails?.avatar,
            _id: item?.ownerDetail?._id || item?.ownerDetails?._id,
          },
        }),
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

  //Reply message to user
  const handelReply = (chatId: any) => {
    dispatch(
      setActiveReply({
        chatId: chatId,
        content: item?.content,
        media: item?.media,
      }),
    );
  };

  //Delete message from chat
  const handelDelete = () => {
    socket.emit(CHAT_SOCKETS_EMIT?.UPDATE_MESSAGE, {
      messageId: item?._id,
      isDeleted: true,
    });
  };

  // Read message functionality from socket
  useEffect(() => {
    if (
      role === CHAT_MESSAGE_ROLES?.RECEIVER &&
      activeChatId === item?.chatId
    ) {
      if (item?.isRead === false) {
        socket.emit(CHAT_SOCKETS_EMIT?.UPDATE_MESSAGE, {
          messageId: item?._id,
          isRead: true,
          groupId: activeChatId,
          ...(chatMode === 'groupChat' && {
            ownerDetails: {
              firstName:
                item?.ownerDetail?.firstName || item?.ownerDetails?.firstName,
              lastName:
                item?.ownerDetail?.lastName || item?.ownerDetails?.lastName,
              avatar: item?.ownerDetail?.avatar || item?.ownerDetails?.avatar,
              _id: item?.ownerDetail?._id || item?.ownerDetails?._id,
            },
          }),
        });
      }
    }
  }, []);

  useEffect(() => {
    dispatch(
      setChatContacts({
        ...activeChatState,
        unReadMessagesCount: '',
      }),
    );
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
            src={
              item?.ownerDetail?.avatar?.url
                ? `${IMG_URL}${item?.ownerDetail?.avatar?.url}`
                : item?.ownerDetails?.avatar?.url
                  ? `${IMG_URL}${item?.ownerDetails?.avatar?.url}`
                  : UserDefault
            }
            style={{ borderRadius: '50%' }}
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
          {!item?.isDeleted && (
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
                    {item?.parentMessage?.ownerDetail?._id === user?._id ||
                    item?.parentMessage?.ownerDetail[indexNumbers?.ZERO]
                      ?._id === user?._id ||
                    item?.parentMessage?.ownerDetails?._id === user?._id ? (
                      'You'
                    ) : (
                      <>
                        {item?.parentMessage?.ownerDetail?.firstName ||
                        item?.parentMessage?.ownerDetail?.[indexNumbers?.ZERO]
                          ?.firstName
                          ? `${
                              item?.parentMessage?.ownerDetail?.firstName ||
                              item?.parentMessage?.ownerDetail?.[
                                indexNumbers?.ZERO
                              ]?.firstName
                            } ${
                              item?.parentMessage?.ownerDetail?.lastName ||
                              item?.parentMessage?.ownerDetail?.[
                                indexNumbers?.ZERO
                              ]?.lastName
                            }`
                          : `${item?.parentMessage?.ownerDetails?.firstName} ${item?.parentMessage?.ownerDetails?.lastName}`}
                      </>
                    )}
                  </Typography>
                  {item?.parentMessage?.media?.length > 0 && (
                    <Box
                      sx={{ marginLeft: '15px', display: 'flex', gap: '5px' }}
                    >
                      {item?.parentMessage?.media?.map((item: any) => (
                        <Image
                          key={uuidv4()}
                          src={`${IMG_URL}${item?.url}`}
                          width={50}
                          height={50}
                          alt="attachments"
                          style={{ borderRadius: '8px' }}
                        />
                      ))}
                    </Box>
                  )}
                  <Box sx={styles?.chatReplyReferenceContent}>
                    <Typography
                      variant="body3"
                      sx={{
                        color: theme?.palette?.custom?.sliver_grey,
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
                    <>
                      {role === 'receiver' && (
                        <Box>
                          <Typography
                            variant="body3"
                            color={theme?.palette?.common?.black}
                            sx={{
                              fontWeight: '500',
                            }}
                          >
                            {item?.ownerDetail?.firstName
                              ? `${item?.ownerDetail?.firstName} ${item?.ownerDetail?.lastName}`
                              : `${item?.ownerDetails?.firstName} ${item?.ownerDetails?.lastName}`}
                          </Typography>
                        </Box>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </>
          )}
          <Box
            sx={styles?.chatMessageArea(role)}
            onMouseOver={() => setActiveChat(item?._id)}
            onMouseLeave={() => setActiveChat('')}
          >
            <Box>
              <Box sx={styles?.chatBoxWrapperInset(theme, role)}>
                {!item?.isDeleted && (
                  <>
                    {item?.type === CHAT_MESSAGE_TYPE?.IMAGE && (
                      <Box
                        key={uuidv4()}
                        sx={{
                          width: '16vw',
                          display: 'inline-flex',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        {item?.media?.map((item: any) => (
                          <Box key={uuidv4()}>
                            {/* eslint-disable-next-line */}
                            <img
                              src={`${IMG_URL}${item?.url}`}
                              alt="media"
                              style={{
                                width: 'auto',
                                maxHeight: '150px',
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}

                {!item?.attachment?.document && (
                  <Box>
                    {!item?.isDeleted ? (
                      <Typography
                        ref={divToCopyRef}
                        variant="body3"
                        dangerouslySetInnerHTML={{
                          __html: item?.content,
                        }}
                      />
                    ) : (
                      <Typography variant="body3">
                        <em>This message was deleted</em>
                      </Typography>
                    )}
                  </Box>
                )}

                {!item?.isDeleted && (
                  <>
                    {item?.type === 'docs' && (
                      <Box>
                        {item?.media?.map((item: any) => (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '10px',
                            }}
                            key={uuidv4()}
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
                                {item?.orignalName}
                              </Typography>
                            </Box>
                            <Box sx={{ cursor: 'pointer' }}>
                              <a
                                href={`${IMG_URL}${item?.url}`}
                                download={`${IMG_URL}${item?.url}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <DownloadRoundedIcon />
                              </a>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
                {role === CHAT_MESSAGE_ROLES?.SENDER && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: '5px',
                      bottom: '-2px',
                    }}
                  >
                    {!item?.isDeleted && (
                      <CharmTickIcon isRead={item?.isRead} />
                    )}
                  </Box>
                )}

                {!item?.isDeleted && (
                  <Box sx={styles?.chatReactionWrapper(theme)}>
                    {item?.reactions?.map((emoji: any) => (
                      <Box
                        key={uuidv4()}
                        sx={styles?.chatReaction}
                        dangerouslySetInnerHTML={{
                          __html: emoji?.userReaction,
                        }}
                      />
                    ))}
                  </Box>
                )}

                {!item?.isDeleted && (
                  <>
                    {item?._id === activeChat && (
                      <Box sx={styles?.sendReaction(theme, role)}>
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
                  </>
                )}
              </Box>
              <Box
                sx={{ textAlign: `${role === 'sender' ? 'left' : 'right'}` }}
              >
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette.custom?.dim_blue }}
                >
                  {dayjs(item?.updatedAt).format(TIME_FORMAT?.UI)}
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
              {!item?.isDeleted && (
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
              )}
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
                  <MenuItem
                    onClick={() => {
                      handelReply(item?._id);
                      handleClose();
                    }}
                  >
                    Reply
                  </MenuItem>

                  {role === CHAT_TYPES?.SENDER && (
                    <MenuItem
                      onClick={() => {
                        handelDelete();
                        handleClose();
                      }}
                    >
                      Delete
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleCopyClick();
                      handleClose();
                    }}
                  >
                    Copy
                  </MenuItem>
                </Menu>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ChatBox = memo(ChatBoxComponent);
export default ChatBox;
