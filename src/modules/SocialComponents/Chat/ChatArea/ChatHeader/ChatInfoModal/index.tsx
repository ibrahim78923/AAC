import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Modal,
  Typography,
  useTheme,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

import MediaAssets from './MediaAssets';
import DocumentAssets from './DocumentAssets';
import LinksAssets from './LinksAssets';
import Members from './Members';

import { ChatInfoModalPropsI } from './ChatInfoModal.interface';

import {
  viewGroupInfoButtonData,
  viewUserProfileButtonData,
} from './ChatInfoModal.data';

import CloseIcon from '@/assets/icons/shared/close-icon';
import { UserDefault } from '@/assets/images';

import { styles } from './ChatInfoModal.style';

import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/redux/store';
import { useGetUserChatsInfoQuery } from '@/services/chat';

const ChatInfoModal = ({
  isUserProfile,
  setIsUserProfile,
  chatMode,
  activeParticipant,
}: ChatInfoModalPropsI) => {
  const theme = useTheme();
  const [toggleSwitchActive, setToggleSwitchActive] = useState('image');
  const activeChatId = useAppSelector(
    (state: any) => state?.chat?.activeChatId,
  );
  const { data: chatsData } = useGetUserChatsInfoQuery({
    activeChatId: activeChatId,
    limit: '100',
    isGroup: chatMode === 'groupChat' ? true : false,
    mediaType: toggleSwitchActive,
  });

  const handleSelection = (_: any, newValue: any) => {
    if (newValue !== null) {
      setToggleSwitchActive(newValue);
    }
  };

  const buttonsToShow =
    chatMode === 'groupChat'
      ? viewGroupInfoButtonData
      : viewUserProfileButtonData;

  const activeConversation = useAppSelector(
    (state) => state?.chat?.activeConversation,
  );

  return (
    <Modal
      open={isUserProfile}
      onClose={() => setIsUserProfile(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styles?.customModal}
    >
      <Box sx={styles?.infoModalWrapper}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: '500' }}>
            {chatMode === 'groupChat' ? 'Group Info' : 'Profile'}
          </Typography>
          <Box onClick={() => setIsUserProfile(false)}>
            <CloseIcon />
          </Box>
        </Box>
        <Box sx={styles?.chatInfoDetails(theme)}>
          <Image src={UserDefault} width={95} height={95} alt="profile-image" />
          <br />
          {chatMode === 'groupChat' ? (
            <Typography
              variant="h6"
              sx={{ fontWeight: '600', color: theme?.palette?.common?.black }}
            >
              {activeConversation?.groupName}
            </Typography>
          ) : (
            <>
              <Typography variant="body3" sx={{ fontWeight: '500' }}>
                Phone: {activeParticipant?.phone}
              </Typography>
              <Typography variant="body3" sx={{ fontWeight: '500' }}>
                Email: {activeParticipant?.email}
              </Typography>
            </>
          )}
        </Box>
        <br />
        <Divider sx={{ border: `1px solid ${theme.palette.custom.dark}` }} />
        <br />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={toggleSwitchActive}
            exclusive
            onChange={handleSelection}
            aria-label="text alignment"
          >
            {buttonsToShow.map((item: any) => (
              <ToggleButton
                key={uuidv4()}
                value={item.value}
                aria-label={item.position}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box>
          {toggleSwitchActive === 'image' && (
            <MediaAssets data={chatsData?.data?.messages} />
          )}
          {toggleSwitchActive === 'docs' && (
            <DocumentAssets data={chatsData?.data?.messages} />
          )}
          {toggleSwitchActive === 'link' && <LinksAssets />}
          {toggleSwitchActive === 'members' && <Members />}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatInfoModal;
