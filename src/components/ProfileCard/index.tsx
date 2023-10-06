import React from 'react';

import Image from 'next/image';

import { Box, Typography, Button, useTheme } from '@mui/material';

import CardPropsI from './ProfileCard.interface';

import { styles } from './ProfileCard.style';

import {
  EmailIcon,
  PhoneIcon,
  EditIcon,
  EditColoredIcon,
} from '@/assets/icons';

import { UserProfileImage } from '@/assets/images';

const ProfileCard = (props: CardPropsI) => {
  const theme = useTheme();
  const {
    src = UserProfileImage,
    userName = 'John Doe',
    role = 'Org Admin',
    email = 'Johndoe@gmail.com',
    phone = '(316) 555-0116',
    handleEditProfile = () => {},
    handleEditImage = () => {},
    editBtn = true,
    isBadge = true,
  } = props;

  return (
    <Box sx={styles.cardWrapper(theme)}>
      <Box sx={styles.profile}>
        <Box sx={styles.imgWrapper}>
          <Box
            className="edit-Icon"
            sx={styles.editIcon}
            onClick={handleEditImage}
          >
            <EditIcon />
          </Box>
          <Image className="user_profile" alt="user_profile" src={src} />
        </Box>
        <Box>
          <Typography variant="h3">{userName}</Typography>
          {isBadge && (
            <Typography component={'span'} sx={styles.badge(theme)}>
              {role}
            </Typography>
          )}
          <Box
            sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mt: '16px' }}
          >
            <Box sx={styles.icon}>
              <Typography component="span" sx={styles.iconWrapper(theme)}>
                <EmailIcon />
              </Typography>
              {email}
            </Box>
            <Box sx={styles.icon}>
              <Typography component="span" sx={styles.iconWrapper}>
                <PhoneIcon />
              </Typography>
              {phone}
            </Box>
          </Box>
        </Box>
      </Box>
      {editBtn && (
        <Button onClick={handleEditProfile}>
          Edit Profile
          <EditColoredIcon />
        </Button>
      )}
    </Box>
  );
};

export default ProfileCard;
