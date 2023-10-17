import { useState } from 'react';

import Image from 'next/image';

import { Box, useTheme, Typography, Divider } from '@mui/material';

import ChatFooter from './ChatFooter';

import {
  chatsData,
  groupChatsData,
} from '@/mock/modules/SocialComponents/Chat';

import { isNullOrEmpty } from '@/utils';

import { customEmojis } from './ChatField.data';

import { CharmTickIcon, ReplyIcon, ThreeDotsIcon } from '@/assets/icons';

import { styles } from './ChatField.style';

import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/redux/store';

const ChatField = () => {
  const theme = useTheme();
  const chatModeState = useAppSelector(
    (state: any) => state.chat.chatModeState,
  );
  const [activeChat, setActiveChat] = useState('');
  const chatMode = chatModeState.chatModeState;

  const chatDataToShow = chatMode === 'groupChat' ? groupChatsData : chatsData;

  return (
    <>
      <Box sx={{ padding: '30px', height: '60vh' }}>
        <Box>
          <Box sx={styles.timeSlot(theme)}>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.custom.grayish_blue }}
            >
              Sep 09
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: theme.palette.grey[700], marginTop: '-14px' }}
          />
        </Box>

        <Box sx={{ paddingTop: '30px' }}>
          {!isNullOrEmpty(chatsData) &&
            chatDataToShow.map((item: any) => (
              <>
                <Box key={uuidv4()}>
                  <Box sx={styles.mainChatArea(item.role)}>
                    <Box sx={{ marginBottom: '25px' }}>
                      <Image
                        width={30}
                        height={30}
                        src={item.userImage}
                        alt="avatar"
                      />
                    </Box>
                    <Box>
                      {chatMode === 'groupChat' && (
                        <>
                          {item.messageReplyContents ? (
                            <Box sx={styles.chatReplyReference}>
                              <Typography
                                variant="body3"
                                sx={{
                                  color: '#6E7191',
                                }}
                              >
                                <ReplyIcon />
                                &nbsp;&nbsp;{item.userName}replied to{' '}
                                {item.messageReplyContents.replyTo}
                              </Typography>
                              <Box sx={styles.chatReplyReferenceContent}>
                                <Typography
                                  variant="body3"
                                  sx={{
                                    color: '#9D9D9D',
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.messageReplyContents
                                        .messageRefference,
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
                                {item.userName}
                              </Typography>
                            </Box>
                          )}
                        </>
                      )}
                      <Box
                        sx={styles.chatMessageArea(item.role)}
                        onMouseOver={() => setActiveChat(item.chatID)}
                        onMouseLeave={() => setActiveChat('')}
                      >
                        <Box>
                          <Box
                            sx={styles.chatBoxWrapperInset(theme, item.role)}
                          >
                            <Typography
                              variant="body3"
                              dangerouslySetInnerHTML={{ __html: item.message }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                right: '5px',
                                bottom: '0px',
                              }}
                            >
                              <CharmTickIcon />
                            </Box>
                            {item.chatReaction && (
                              <Box
                                sx={styles.chatReaction}
                                dangerouslySetInnerHTML={{
                                  __html: item.chatReaction,
                                }}
                              />
                            )}
                            {item.chatID === activeChat && (
                              <Box sx={styles.sendReaction(theme)}>
                                {customEmojis.map((emoji: any) => (
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
                              {item.timeStamp}
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
                          <ThreeDotsIcon
                            color={theme.palette.custom.grayish_blue}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
        </Box>
      </Box>
      <ChatFooter />
    </>
  );
};

export default ChatField;
