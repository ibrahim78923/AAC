import React from 'react';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import cardProps from '@/types/shared/ProfileCard';
import { UserProfile } from '@/assets/images';
import { EmailIcon, PhoneIcon } from '@/assets/icons';
import EditIconShared from '@/assets/icons/shared/edit-shared';
import EditColoredIconShared from '@/assets/icons/shared/edit-colored-shared';

const style = {
  cardWrapper: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: '8px',
    flexWrap: 'wrap',
    display: 'flex',
    padding: '24px',
  },
  profile: {
    gap: { md: '24px', xs: '12px' },
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
  },
  badge: {
    backgroundColor: '#E6FAEB',
    borderRadius: '30px',
    padding: '2px 8px',
    color: '#47B263',
  },
  imgWrapper: {
    position: 'relative',
    borderRadius: '21px',
    overflow: 'hidden',
    height: 120,
    width: 120,
    '& .user_profile': {
      objectFit: 'cover',
      heigth: '100%',
      width: '100%',
    },
    '&:hover': {
      '& .edit-Icon': {
        display: 'flex',
      },
    },
  },
  editIcon: {
    transition: 'all 0.2s linear',
    justifyContent: 'center',
    background: '#79839E99',
    position: 'absolute',
    alignItems: 'center',
    cursor: 'pointer',
    display: 'none',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
  },
  iconWrapper: {
    background: '#F9FAFB',
    borderRadius: '4px',
    height: '28px',
    width: '28px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
};

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
            <EditIconShared />
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
          <EditColoredIconShared />
        </Button>
      )}
    </Box>
  );
};

export default ProfileCard;
