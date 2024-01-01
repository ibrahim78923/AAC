import { Box, CircularProgress } from '@mui/material';

import ChatFooter from './ChatFooter';
import { AlertModals } from '@/components/AlertModals';
import ChatBox from './ChatBox';
import { chatsData } from '@/mock/modules/SocialComponents/Chat';

import { customEmojis } from './ChatField.data';

import { useChatField } from './useChatField.hook';

import { getSession, isNullOrEmpty } from '@/utils';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import { setChatMetaInfo } from '@/redux/slices/chat/slice';

const ChatField = () => {
  const {
    chatMode,
    activeChat,
    setActiveChat,
    isDeleteModal,
    setIsDeleteModal,
    chatDataToShow,
  } = useChatField();

  const dispatch = useAppDispatch();

  const chatMetaInfo = useAppSelector((state) => state?.chat?.chatMetaInfo);
  const isChatMessagesLoading = useAppSelector(
    (state) => state?.chat?.isChatMessagesLoading,
  );

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const boxRef = useRef<any>(null);
  useEffect(() => {
    if (boxRef?.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [chatDataToShow.length > 1]);

  useEffect(() => {
    const handleScroll = () => {
      const box = boxRef?.current;
      if (box.scrollTop === 0) {
        const newLimit = Math.min(chatMetaInfo.limit + 5, chatMetaInfo.total);
        dispatch(setChatMetaInfo({ ...chatMetaInfo, limit: newLimit }));
      }
    };

    const box = boxRef?.current;
    box.addEventListener('scroll', handleScroll);

    return () => {
      box.removeEventListener('scroll', handleScroll);
    };
  }, [chatMetaInfo]);

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
        {isChatMessagesLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {/* <Box>
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
          </Box> */}
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
