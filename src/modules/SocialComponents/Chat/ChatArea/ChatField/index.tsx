import { Box, Typography, Divider, CircularProgress } from '@mui/material';

import ChatFooter from './ChatFooter';
import { AlertModals } from '@/components/AlertModals';
import ChatBox from './ChatBox';
import { chatsData } from '@/mock/modules/SocialComponents/Chat';

import { customEmojis } from './ChatField.data';

import { useChatField } from './useChatField.hook';

import { getSession, isNullOrEmpty } from '@/utils';

import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/store';

import { styles } from './ChatField.style';

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

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const boxRef = useRef<any>(null);
  const chatMessages = useAppSelector(
    (state: any) => state?.chat?.messageStatus,
  );

  useEffect(() => {
    if (boxRef?.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [chatDataToShow]);

  return (
    <>
      {chatMessages ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          ref={boxRef}
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
              sx={{
                borderColor: theme?.palette?.grey[700],
                marginTop: '-14px',
              }}
            />
          </Box>
          <Box sx={{ paddingTop: '30px' }}>
            {!isNullOrEmpty(chatsData) &&
              chatDataToShow &&
              chatDataToShow
                ?.slice()
                ?.reverse()
                ?.map((item: any) => {
                  const role =
                    item?.ownerId === user?._id ? 'sender' : 'receiver';
                  return (
                    <>
                      <ChatBox
                        item={item}
                        role={role}
                        chatMode={chatMode}
                        setActiveChat={setActiveChat}
                        activeChat={activeChat}
                        customEmojis={customEmojis}
                      />
                    </>
                  );
                })}
          </Box>
        </Box>
      )}

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
