import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

import ChatFooter from './ChatFooter';
import { AlertModals } from '@/components/AlertModals';
import ChatBox from './ChatBox';

import { customEmojis } from './ChatField.data';

import { useChatField } from './useChatField.hook';

import { getSession } from '@/utils';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import { setChatMetaInfo } from '@/redux/slices/chat/slice';

const ChatField = ({ isError }: any) => {
  const {
    chatMode,
    activeChat,
    setActiveChat,
    isDeleteModal,
    setIsDeleteModal,
    chatDataToShow,
  } = useChatField();

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const chatMetaInfo = useAppSelector((state) => state?.chat?.chatMetaInfo);
  const changeChat = useAppSelector((state) => state?.chat?.changeChat);
  const isChatMessagesLoading = useAppSelector(
    (state) => state?.chat?.isChatMessagesLoading,
  );

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const boxRef = useRef<any>(null);

  useEffect(() => {
    if (boxRef?.current) {
      boxRef.current.scrollTop = boxRef?.current?.scrollHeight;
    }
  }, [chatDataToShow?.length > 1, changeChat]);

  useEffect(() => {
    const handleScroll = () => {
      const box = boxRef?.current;
      if (box?.scrollTop === 0) {
        if (isChatMessagesLoading) {
          null;
        } else {
          if (chatMetaInfo?.pages === chatMetaInfo?.page) {
            null;
          } else {
            dispatch(
              setChatMetaInfo({
                ...chatMetaInfo,
                // limit: chatMetaInfo?.limit + 10,
                page: chatMetaInfo?.page + 1,
              }),
            );
          }
        }
      }
    };
    const box = boxRef?.current;
    box?.addEventListener('scroll', handleScroll);
    return () => {
      box?.removeEventListener('scroll', handleScroll);
    };
  }, [chatMetaInfo, isChatMessagesLoading]);

  const handleScrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatDataToShow?.length < 11) {
      handleScrollToBottom();
    }
  }, []);

  return (
    <>
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
        {isError ? (
          <Typography
            variant="body2"
            color={theme?.palette?.error?.main}
            textAlign="center"
          >
            Something went wrong
          </Typography>
        ) : (
          <>
            {isChatMessagesLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            <Box sx={{ paddingTop: '30px' }}>
              {chatDataToShow?.length ? (
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
                  })
              ) : (
                <>
                  {!isChatMessagesLoading && (
                    <Box
                      sx={{
                        background: theme?.palette?.grey[700],
                        padding: '5px 10px',
                        borderRadius: '4px',
                        width: 'fit-content',
                        margin: '0 auto',
                        marginTop: '-50px',
                      }}
                    >
                      <Typography variant="body2">Start a new chat</Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>

            {isChatMessagesLoading && chatDataToShow?.length < 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '-30px',
                }}
              >
                <CircularProgress size={25} />
              </Box>
            )}
          </>
        )}
      </Box>
      <ChatFooter handleScrollToBottom={handleScrollToBottom} />
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={() => setIsDeleteModal(false)}
      />
    </>
  );
};

export default ChatField;
