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
    handleEditProfile,
    handleEditImage = () => {},
    editBtn = true,
    isBadge = true,
  } = props;

  return (
    <Box sx={styles.cardWrapper(theme)}>
      <Box
        sx={{
          color: theme?.palette?.primary?.light,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={styles?.imgWrapper}>
          <label htmlFor="upload-button">
            <Box
              className="edit-Icon"
              sx={styles?.editIcon}
              onClick={handleEditImage}
            >
              <EditIcon />
            </Box>
            <Image
              className="user_profile"
              alt="user_profile"
              src={src}
              width={100}
              height={100}
            />
            <input
              type="file"
              id="upload-button"
              style={{ display: 'none' }}
              accept="image/png, image/gif, image/jpeg, image/webp"
              // onChange={handleChangeImg}
            />
          </label>
        </Box>
        <Box pl={{ xs: 0, sm: 2 }}>
          <Typography
            variant="h2"
            sx={{ color: `${theme?.palette?.grey[800]}` }}
          >
            {userName}
          </Typography>
          {isBadge && (
            <Typography component={'span'} sx={styles?.badge(theme)}>
              {role}
            </Typography>
          )}
          <Box
            sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', mt: '16px' }}
          >
            <Box sx={styles?.icon}>
              <Typography component="span" sx={styles?.iconWrapper(theme)}>
                <EmailIcon />
              </Typography>
              <Typography
                variant="body4"
                sx={{ color: `${theme?.palette?.custom?.main}` }}
              >
                {email}
              </Typography>
            </Box>
            <Box sx={styles?.icon}>
              <Typography component="span" sx={styles?.iconWrapper}>
                <PhoneIcon />
              </Typography>

              <Typography
                variant="body4"
                sx={{ color: `${theme?.palette?.custom?.main}` }}
              >
                {phone}
              </Typography>
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
