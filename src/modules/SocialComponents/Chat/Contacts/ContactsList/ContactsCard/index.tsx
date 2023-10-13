import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Checkbox, Typography, useTheme } from '@mui/material';

import { UserAvatarImage } from '@/assets/images';

import { DeleteIcon, PinIcon } from '@/assets/icons';

import { styles } from './ContactsCard.style';

const ContactsCard = () => {
  const theme = useTheme();
  const [isCardHover, setIsCardHover] = useState(false);
  return (
    <>
      <Box
        sx={styles.contactsCardMain(isCardHover)}
        onMouseOver={() => setIsCardHover(true)}
        onMouseLeave={() => setIsCardHover(false)}
      >
        {isCardHover && <Checkbox checked={false} />}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image
                width={isCardHover ? 32 : 24}
                height={isCardHover ? 32 : 24}
                src={UserAvatarImage}
                alt="avatar"
              />
              <Box sx={{ width: '140px' }}>
                <Typography variant="h6" sx={{ fontWeight: '600' }}>
                  Paula Griffin
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box sx={styles.chatNotification}>12</Box>
              {isCardHover && (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <DeleteIcon />
                  <PinIcon />
                </Box>
              )}
            </Box>
          </Box>
          <Typography variant="body3" sx={{ color: theme.palette.grey[600] }}>
            How are you?
          </Typography>
          <br />
          <Typography variant="body3" sx={{ color: '#6E7191' }}>
            12:48PM
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ContactsCard;
