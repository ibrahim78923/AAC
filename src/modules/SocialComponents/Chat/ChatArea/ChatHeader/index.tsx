import { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { UserAvatarImage } from '@/assets/images';

import { PhoneWhiteIcon, ThreeDotsIcon, UserWhiteIcon } from '@/assets/icons';

import { styles } from './ChatHeader.style';
import ChatInfoModal from './ChatInfoModal';

const ChatHeader = () => {
  const theme = useTheme();
  const [isUserProfile, setIsUserProfile] = useState(false);
  return (
    <>
      <Box sx={styles.headerChat(theme)}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image width={55} height={55} src={UserAvatarImage} alt="avatar" />
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: '600', color: theme.palette.common.white }}
            >
              Paula Griffin
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box sx={styles.userStatus}></Box>
              <Typography
                variant="body3"
                sx={{ fontWeight: '600', color: theme.palette.common.white }}
              >
                Active Now
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button sx={styles.unStyledButton}>
            <PhoneWhiteIcon />
          </Button>
          <Button
            sx={styles.unStyledButton}
            onClick={() => setIsUserProfile(true)}
          >
            <UserWhiteIcon />
          </Button>
          <Button sx={styles.unStyledButton}>
            <ThreeDotsIcon color={theme.palette.common.white} />
          </Button>
        </Box>
      </Box>
      <ChatInfoModal
        isUserProfile={isUserProfile}
        setIsUserProfile={setIsUserProfile}
      />
    </>
  );
};

export default ChatHeader;
