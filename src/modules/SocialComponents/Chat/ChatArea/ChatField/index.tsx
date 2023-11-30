import { Box, Typography, Divider } from '@mui/material';

import ChatFooter from './ChatFooter';
import { AlertModals } from '@/components/AlertModals';

import { chatsData } from '@/mock/modules/SocialComponents/Chat';
import { customEmojis } from './ChatField.data';

import { useChatField } from './useChatField.hook';

import { isNullOrEmpty } from '@/utils';

import { styles } from './ChatField.style';

import ChatBox from './ChatBox';

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
                <ChatBox
                  item={item}
                  chatMode={chatMode}
                  setActiveChat={setActiveChat}
                  activeChat={activeChat}
                  customEmojis={customEmojis}
                />
              </>
            ))}
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
