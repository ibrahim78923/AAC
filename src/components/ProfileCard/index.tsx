import { Box, Typography, Button, useTheme, Avatar } from '@mui/material';

import CardPropsI from './ProfileCard.interface';

import { styles } from './ProfileCard.style';

import {
  EmailIcon,
  PhoneIcon,
  EditIcon,
  EditColoredIcon,
} from '@/assets/icons';

const ProfileCard = (props: CardPropsI) => {
  const theme = useTheme();

  const {
    src,
    userName = 'John Doe',
    role = 'Org Admin',
    email = 'Johndoe@gmail.com',
    phone = '(316) 555-0116',
    handleEditProfile,
    handleEditImage = () => {},
    editBtn = true,
    isBadge = true,
    handleChangeImg,
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
        <Box
          sx={{
            position: 'relative',
            '&:hover .edit-Icon': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              height: 120,
              width: 120,
              borderRadius: '21px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <label htmlFor="upload-button">
            <Avatar src={src} sx={styles?.imgWrapper(theme?.palette)} />
            <Box
              className="edit-Icon"
              sx={styles?.editIcon}
              onClick={handleEditImage}
            >
              <EditIcon />
            </Box>
            <input
              type="file"
              id="upload-button"
              style={{ display: 'none' }}
              accept="image/png, image/gif, image/jpeg, image/webp"
              onChange={(e: any) => handleChangeImg(e)}
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
