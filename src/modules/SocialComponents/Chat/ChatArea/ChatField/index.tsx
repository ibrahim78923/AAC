import Image from 'next/image';

import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import ChatFooter from './ChatFooter';
import { AlertModals } from '@/components/AlertModals';

import { chatsData } from '@/mock/modules/SocialComponents/Chat';
import { customEmojis } from './ChatField.data';

import { useChatField } from './useChatField.hook';

import { isNullOrEmpty } from '@/utils';

import {
  CharmTickIcon,
  DownloadRoundedIcon,
  PaperClipIcon,
  ReplyIcon,
  ThreeDotsIcon,
} from '@/assets/icons';

import { styles } from './ChatField.style';

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const ChatField = () => {
  const {
    theme,
    chatMode,
    activeChat,
    setActiveChat,
    isDeleteModal,
    setIsDeleteModal,
    chatDataToShow,
  } = useChatField();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          padding: '30px',
          height: '60vh',
          overflow: 'scroll',
          '@media (max-width: 600px)': {
            padding: '10px',
          },
        }}
      >
        <Box>
          <Box sx={styles?.timeSlot(theme)}>
            <Typography
              variant="h6"
              sx={{ color: theme?.palette?.custom?.grayish_blue }}
            >
              Sep 09
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: theme?.palette?.grey[700], marginTop: '-14px' }}
          />
        </Box>
        <Box sx={{ paddingTop: '30px' }}>
          {!isNullOrEmpty(chatsData) &&
            chatDataToShow?.map((item: any) => (
              <>
                <Box key={uuidv4()} sx={{ marginTop: '20px' }}>
                  <Box sx={styles?.mainChatArea(item?.role)}>
                    <Box sx={{ marginBottom: '25px' }}>
                      <Image
                        width={30}
                        height={30}
                        src={item?.userImage}
                        alt="avatar"
                      />
                    </Box>
                    <Box>
                      {chatMode === 'groupChat' && (
                        <>
                          {item?.messageReplyContents ? (
                            <Box sx={styles?.chatReplyReference}>
                              <Typography
                                variant="body3"
                                sx={{
                                  color: '#6E7191',
                                }}
                              >
                                <ReplyIcon />
                                &nbsp;&nbsp;{item?.userName}replied to{' '}
                                {item?.messageReplyContents?.replyTo}
                              </Typography>
                              <Box sx={styles?.chatReplyReferenceContent}>
                                <Typography
                                  variant="body3"
                                  sx={{
                                    color: '#9D9D9D',
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item?.messageReplyContents
                                        ?.messageRefference,
                                  }}
                                />
                              </Box>
                            </Box>
                          ) : (
                            <Box>
                              <Typography
                                variant="body3"
                                sx={{ color: '#6E7191', fontWeight: '500' }}
                              >
                                {item?.userName}
                              </Typography>
                            </Box>
                          )}
                        </>
                      )}
                      <Box
                        sx={styles?.chatMessageArea(item?.role)}
                        onMouseOver={() => setActiveChat(item?.chatID)}
                        onMouseLeave={() => setActiveChat('')}
                      >
                        <Box>
                          <Box
                            sx={styles?.chatBoxWrapperInset(theme, item?.role)}
                          >
                            {!item?.attachment?.document && (
                              <Typography
                                variant="body3"
                                dangerouslySetInnerHTML={{
                                  __html: item?.message,
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
                                  {item?.attachment?.images?.map(
                                    (item: any) => (
                                      <Grid
                                        item
                                        xs={9}
                                        sm={4}
                                        md={4}
                                        lg={4}
                                        key={uuidv4()}
                                      >
                                        <Image
                                          src={item?.img}
                                          height={80}
                                          alt="media"
                                        />
                                      </Grid>
                                    ),
                                  )}
                                </Grid>
                              </Box>
                            )}
                            {item.attachment?.document && (
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
                              <CharmTickIcon />
                            </Box>
                            {item?.chatReaction && (
                              <Box
                                sx={styles?.chatReaction}
                                dangerouslySetInnerHTML={{
                                  __html: item?.chatReaction,
                                }}
                              />
                            )}
                            {item?.chatID === activeChat && (
                              <Box sx={styles?.sendReaction(theme)}>
                                {customEmojis?.map((emoji: any) => (
                                  <Box
                                    key={uuidv4()}
                                    dangerouslySetInnerHTML={{
                                      __html: emoji,
                                    }}
                                  />
                                ))}
                              </Box>
                            )}
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography
                              variant="body3"
                              sx={{ color: '#6E7191' }}
                            >
                              {item?.timeStamp}
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
                            <ThreeDotsIcon
                              color={theme?.palette?.custom?.grayish_blue}
                            />
                          </Button>
                          {item?.chatID === activeChat && (
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                'aria-labelledby': 'basic-button',
                              }}
                            >
                              <MenuItem onClick={handleClose}>Profile</MenuItem>
                              <MenuItem onClick={handleClose}>
                                My account
                              </MenuItem>
                              <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
          {/* <>
            <Button sx={styles?.unStyledButton}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <ThreeDotsIcon
                color={theme?.palette?.custom?.grayish_blue}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </> */}
        </Box>
      </Box>
      <ChatFooter />
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
    </>
  );
};

export default ChatField;
