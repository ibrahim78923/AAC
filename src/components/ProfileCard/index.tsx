import React from 'react';

import Image from 'next/image';

import { Box, Typography, Button } from '@mui/material';

import cardProps from './ProfileCardInterface';

import {
  EmailIcon,
  PhoneIcon,
  EditIcon,
  EditIconColored,
} from '@/assets/icons';

import { UserProfile } from '@/assets/images';

import { style } from './ProfileCard.style';

const ProfileCard = (props: cardProps) => {
  const {
    src = UserProfile,
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
    <Box sx={style.cardWrapper}>
      <Box sx={style.profile}>
        <Box sx={style.imgWrapper}>
          <Box
            className="edit-Icon"
            sx={style.editIcon}
            onClick={handleEditImage}
          >
            <EditIcon />
          </Box>
          <Image className="user_profile" alt="user_profile" src={src} />
        </Box>
        <Box>
          <Typography variant="h3">{userName}</Typography>
          {isBadge && (
            <Typography component={'span'} sx={style.badge}>
              {role}
            </Typography>
          )}
          <Box
            sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mt: '16px' }}
          >
            <Box sx={style.icon}>
              <Typography component="span" sx={style.iconWrapper}>
                <EmailIcon />
              </Typography>
              {email}
            </Box>
            <Box sx={style.icon}>
              <Typography component="span" sx={style.iconWrapper}>
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
          <EditIconColored />
        </Button>
      )}
    </Box>
  );
};

export default ProfileCard;
