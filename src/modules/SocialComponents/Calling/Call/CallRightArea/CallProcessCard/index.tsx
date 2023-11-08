import React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography, useTheme } from '@mui/material';

import { callingActions } from './CallProcessCard.data';

import { ArrowBackIcon, CallDropIcon } from '@/assets/icons';
import { UsersAvatarRoundedImage } from '@/assets/images';

import { styles } from './CallProcessCard.style';

import { v4 as uuidv4 } from 'uuid';

const CallProcessCard = ({ phoneNo, name, setIsActiveCalling }: any) => {
  const theme = useTheme();
  const formattedPhoneNumber = (phoneNumber: any) => {
    return phoneNumber?.phoneNo?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };
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
        <Box sx={styles?.callingAreaBx(theme)}>
          <Typography
            variant="h2"
            fontWeight={500}
            textAlign={'center'}
            color={theme?.palette?.custom?.grayish_blue}
          >
            {formattedPhoneNumber({ phoneNo })}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            textAlign={'center'}
            mb={2}
            color={theme?.palette?.custom?.bright}
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
            <Typography
              variant="h3"
              color={theme?.palette?.custom?.grayish_blue}
            >
              {name}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '80%',
              margin: '0 auto',
              mt: 4,
            }}
          >
            <Grid container spacing={2}>
              {callingActions?.map((item: any) => (
                <Grid item xs={4} lg={4} key={uuidv4()}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {item?.icon}
                    <Typography variant="body3">{item?.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
            }}
          >
            <CallDropIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CallProcessCard;
