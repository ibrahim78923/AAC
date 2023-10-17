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

import { ChatInfoModalPropsI } from './ChatInfoModal.interface';

import CloseIcon from '@/assets/icons/shared/close-icon';
import { UserProfileAvatarImage } from '@/assets/images';

import { styles } from './ChatInfoModal.style';

const ChatInfoModal = ({
  isUserProfile,
  setIsUserProfile,
}: ChatInfoModalPropsI) => {
  const theme = useTheme();
  const [toggleSwitchActive, setToggleSwitchActive] = useState('media');

  const handleSelection = (_: any, newValue: any) => {
    if (newValue !== null) {
      setToggleSwitchActive(newValue);
    }
  };

  return (
    <Modal
      open={isUserProfile}
      onClose={() => setIsUserProfile(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styles.customModal}
    >
      <Box sx={styles.infoModalWrapper}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: '500' }}>
            Profile
          </Typography>
          <Box onClick={() => setIsUserProfile(false)}>
            <CloseIcon />
          </Box>
        </Box>
        <Box sx={styles.chatInfoDetails(theme)}>
          <Image
            src={UserProfileAvatarImage}
            width={95}
            height={95}
            alt="profile-image"
          />
          <br />
          <Typography variant="body3" sx={{ fontWeight: '500' }}>
            Phone: (+312) 123456789
          </Typography>
          <Typography variant="body3" sx={{ fontWeight: '500' }}>
            Email: info@aritablecart.com
          </Typography>
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
            <ToggleButton value="media" aria-label="left-aligned">
              Media
            </ToggleButton>
            <ToggleButton value="docs" aria-label="right-aligned">
              Docs
            </ToggleButton>
            <ToggleButton value="link" aria-label="right-aligned">
              Link
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          {toggleSwitchActive === 'media' && <MediaAssets />}
          {toggleSwitchActive === 'docs' && <DocumentAssets />}
          {toggleSwitchActive === 'link' && <LinksAssets />}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatInfoModal;
