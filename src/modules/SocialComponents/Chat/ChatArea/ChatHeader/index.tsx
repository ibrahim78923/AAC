import { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { UserAvatarImage } from '@/assets/images';

import {
  InfoIcon,
  PhoneWhiteIcon,
  ThreeDotsIcon,
  UserWhiteIcon,
} from '@/assets/icons';

import { styles } from './ChatHeader.style';
import ChatInfoModal from './ChatInfoModal';
import ChatDropdown from '../../ChatDropdown';
import { useAppSelector } from '@/redux/store';

const ChatHeader = ({ chatMode }: any) => {
  const theme = useTheme();

  const activeChatId = useAppSelector(
    (state) => state?.chat?.activeParticipant,
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

  const menuItemsData = [
    {
      menuLabel: 'Mark as Unread',
      handler: handleClose,
    },
    {
      menuLabel: 'Mute',
      handler: handleClose,
    },
    {
      menuLabel: 'Archive',
      handler: handleClose,
    },
    {
      menuLabel: 'Delete Conversation',
      handler: () => setIsDeleteModal(true),
    },
  ];

  return (
    <>
      <Box sx={styles?.headerChat(theme)}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image width={55} height={55} src={UserAvatarImage} alt="avatar" />
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: '500', color: theme?.palette?.common?.white }}
            >
              {activeChatId?.firstName}&nbsp;{activeChatId?.lastName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box sx={styles?.userStatus}></Box>
              <Typography
                variant="body3"
                sx={{ fontWeight: '600', color: theme?.palette?.common?.white }}
              >
                Active Now
              </Typography>
            </Box>
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
      />
      <AlertModals
        message={'Are you sure you want to delete this Conversation ?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
    </>
  );
};

export default ChatHeader;
