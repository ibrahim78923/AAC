import { ArrowBackIcon } from '@/assets/icons';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from './CallProcessCard.style';
import Image from 'next/image';
import { UsersAvatarRoundedImage } from '@/assets/images';

const CallProcessCard = ({ phoneNo, name, setIsActiveCalling }: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ padding: '20px' }}>
      <Box onClick={() => setIsActiveCalling(false)}>
        <ArrowBackIcon />
      </Box>
      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={styles.callingAreaBx(theme)}>
          <Typography
            variant="h2"
            fontWeight={500}
            textAlign={'center'}
            color={theme.palette.custom.grayish_blue}
          >
            {phoneNo}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            textAlign={'center'}
            mb={2}
            color={theme.palette.custom.bright}
          >
            Calling...
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image
              src={UsersAvatarRoundedImage}
              width={96}
              height={96}
              style={{ borderRadius: '50%' }}
              alt="user"
            />
            <Typography variant="h3" color={theme.palette.custom.grayish_blue}>
              {name}
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}></Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CallProcessCard;
