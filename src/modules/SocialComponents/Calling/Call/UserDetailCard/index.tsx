import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from './UserDetailCard.style';
import Image from 'next/image';
import { UsersAvatarRoundedImage } from '@/assets/images';
import { CallsDullIcon, MessageDullIcon } from '@/assets/icons';

const UserDetailCard = () => {
  const theme = useTheme();
  return (
    <Box sx={styles.userDetailCard}>
      <Box sx={styles.wrapperDetailsInset}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '10px',
          }}
        >
          <Image
            src={UsersAvatarRoundedImage}
            width={127}
            height={127}
            style={{ borderRadius: '20px' }}
            alt="user-profile"
          />
          <Box>
            <Typography variant="h2" fontWeight={600}>
              John Doe
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              color={theme.palette.custom.grayish_blue}
            >
              (319) 555-0115
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <CallsDullIcon />
          <MessageDullIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailCard;
