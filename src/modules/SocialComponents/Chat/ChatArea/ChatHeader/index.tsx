import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import {
  InfoIcon,
  PhoneWhiteIcon,
  ThreeDotsIcon,
  UserWhiteIcon,
} from '@/assets/icons';

import { styles } from './ChatHeader.style';
import ChatInfoModal from './ChatInfoModal';
import ChatDropdown from '../../ChatDropdown';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  useUpdateChatMutation,
  useUpdateChatUnFetchedMutation,
} from '@/services/chat';
import { enqueueSnackbar } from 'notistack';
import {
  setActiveChat,
  setActiveChatId,
  setActiveConversation,
  setActiveParticipant,
  setActiveReceiverId,
  setChatContacts,
  setChatMessages,
  setNewOrFetchedChatMessages,
  setUpdateChatContactsActions,
} from '@/redux/slices/chat/slice';
import ProfileNameIcon from '@/components/ProfileNameIcon';
import Image from 'next/image';
import { IMG_URL } from '@/config';
import { CHAT_TYPES } from '@/constants';

const ChatHeader = ({ chatMode }: any) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const activeParticipant = useAppSelector(
    (state) => state?.chat?.activeParticipant,
  );
  const activeConversation = useAppSelector(
    (state) => state?.chat?.activeConversation,
  );

  const [isUserProfile, setIsUserProfile] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [updateChat] = useUpdateChatMutation();
  const [updateChatFetched] = useUpdateChatUnFetchedMutation();
  const updateChatHandler = async (requestType: any) => {
    const payloadMap: any = {
      unRead: { unRead: !activeConversation?.unRead },
      isMuted: { isMuted: !activeConversation?.isMuted },
      isArchived: { isArchived: !activeConversation?.isArchived },
      isDeleted: { isArchived: !activeConversation?.isDeleted },
    };
    const payload = payloadMap[requestType] || {};
    try {
      const response = await updateChat({
        body: payload,
        id: activeConversation?.conversationId,
      })?.unwrap();
      enqueueSnackbar('successfully', {
        variant: 'success',
      });
      dispatch(
        setActiveConversation({
          ...activeConversation,
          isDeleted: response?.data?.isDeleted,
          isArchived: response?.data?.isArchived,
          isMuted: response?.data?.isMuted,
          unRead: response?.data?.unRead,
        }),
      ),
        handleClose();
      setIsDeleteModal(false);

      if (requestType === 'unRead') {
        dispatch(setActiveChat({}));
        dispatch(setActiveReceiverId(''));
        dispatch(setActiveConversation({}));
        dispatch(setChatMessages([]));
        dispatch(setChatContacts([]));
        dispatch(setActiveChatId(''));
        dispatch(setActiveParticipant({}));
        dispatch(setNewOrFetchedChatMessages([]));
      }
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };

  const chatContacts = useAppSelector((state) => state?.chat?.chatContacts);

  const updateReadMessageHandler = async () => {
    try {
      const response = await updateChatFetched({
        body: { unRead: false },
        id: activeConversation?.conversationId,
      })?.unwrap();
      dispatch(
        setActiveConversation({
          ...activeConversation,
          isDeleted: response?.data?.isDeleted,
          isArchived: response?.data?.isArchived,
          isMuted: response?.data?.isMuted,
          unRead: response?.data?.unRead,
        }),
      );
      const updatedChatContacts = chatContacts?.map((chat: any) => {
        if (chat._id === response?.data?.chatId) {
          return {
            ...chat,
            unReadMessagesCount: 0,
            unRead: false,
          };
        }
        return chat;
      });
      dispatch(setUpdateChatContactsActions(updatedChatContacts));
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    updateReadMessageHandler();
  }, [activeConversation?.conversationId]);

  const menuItemsData = [
    {
      menuLabel: activeConversation?.unRead ? 'Mark as Read' : 'Mark as Unread',
      handler: () => updateChatHandler('unRead'),
    },
    {
      menuLabel: activeConversation?.isMuted ? 'Un Mute' : 'Mute',
      handler: () => updateChatHandler('isMuted'),
    },
    {
      menuLabel: activeConversation?.isArchived ? 'Un Archive' : 'Archive',
      handler: () => updateChatHandler('isArchived'),
    },
    {
      menuLabel: 'Delete Conversation',
      handler: () => setIsDeleteModal(true),
    },
  ];

  const deleteConversation = async () => {
    const payloadMap: any = {
      deleteMessages: true,
    };
    const payload = payloadMap;
    try {
      await updateChat({
        body: payload,
        id: activeConversation?.conversationId,
      })?.unwrap();
      enqueueSnackbar('successfully', {
        variant: 'success',
      });
      handleClose();
      dispatch(setChatMessages([]));
      dispatch(setActiveReceiverId(null));
      dispatch(setActiveConversation({})), setIsDeleteModal(false);
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };

  const media = useMediaQuery('(max-width: 550px)');

  return (
    <>
      <Box sx={styles?.headerChat(theme)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {activeParticipant?.avatar ? (
            <Image
              width={media ? 30 : 50}
              height={media ? 30 : 50}
              src={`${IMG_URL}${activeParticipant?.avatar}`}
              style={{ borderRadius: '50%' }}
              alt="avatar"
            />
          ) : (
            <ProfileNameIcon
              lastName={activeParticipant?.lastName}
              firstName={activeParticipant?.firstName}
            />
          )}
          <Box>
            <Typography
              variant={media ? 'h6' : 'h4'}
              sx={{
                fontWeight: '500',
                color: theme?.palette?.common?.white,
                textTransform: 'capitalize',
              }}
            >
              {activeParticipant?.firstName}&nbsp;{activeParticipant?.lastName}
            </Typography>

            {chatMode === CHAT_TYPES?.PERSONAL_CHAT && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {activeParticipant?.liveStatus === 'AVAILABLE' ? (
                  <>
                    <Box sx={styles?.userStatus(true)}></Box>
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: '600',
                        color: theme?.palette?.common?.white,
                      }}
                    >
                      Active Now
                    </Typography>
                  </>
                ) : (
                  <>
                    <Box sx={styles?.userStatus(false)}></Box>
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: '600',
                        color: theme?.palette?.common?.white,
                      }}
                    >
                      Offline
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button sx={styles?.unStyledButton}>
            <PhoneWhiteIcon />
          </Button>
          <Button
            sx={styles?.unStyledButton}
            onClick={() => setIsUserProfile(true)}
          >
            {chatMode === 'groupChat' ? <InfoIcon /> : <UserWhiteIcon />}
          </Button>
          <Button
            sx={styles?.unStyledButton}
            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <ThreeDotsIcon color={theme?.palette?.common?.white} />
          </Button>
          <ChatDropdown
            anchorEl={anchorEl}
            actionMenuOpen={actionMenuOpen}
            handleClose={handleClose}
            menuData={menuItemsData}
          />
        </Box>
      </Box>
      <ChatInfoModal
        isUserProfile={isUserProfile}
        setIsUserProfile={setIsUserProfile}
        chatMode={chatMode}
        activeParticipant={activeParticipant}
      />
      <AlertModals
        message={'Are you sure you want to delete this Conversation ?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={() => {
          deleteConversation();
        }}
      />
    </>
  );
};

export default ChatHeader;
