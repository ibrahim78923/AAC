import React from 'react';

import Image from 'next/image';

import { Box, Typography, useTheme } from '@mui/material';

import useCalling from '../../useCalling';

import { CallsDullIcon, MessageDullIcon } from '@/assets/icons';

import { styles } from './UserDetailCard.style';

const UserDetailCard = ({ image, name, phone, handelCall, isMessage }: any) => {
  const theme = useTheme();

  const { formattedPhoneNumber } = useCalling();

  return (
    <Box sx={styles?.userDetailCard}>
      <Box sx={styles?.wrapperDetailsInset}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '10px',
          }}
        >
          <Image
            src={image}
            width={127}
            height={127}
            style={{ borderRadius: '20px' }}
            alt="user-avatar"
          />
          <Box>
            <Typography variant="h2" fontWeight={600}>
              {name}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              color={theme?.palette?.custom?.grayish_blue}
            >
              {formattedPhoneNumber(phone)}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles?.cardFeatures}>
          <Box onClick={handelCall}>
            <CallsDullIcon />
          </Box>
          {isMessage && <MessageDullIcon />}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailCard;
