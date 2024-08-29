import { Box, Typography, Button, useTheme, Avatar } from '@mui/material';
import CardPropsI from './ProfileCard.interface';
import { styles } from './ProfileCard.style';
import {
  EmailIcon,
  PhoneIcon,
  EditIcon,
  EditColoredIcon,
} from '@/assets/icons';
import { ORG_ADMIN_USERS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import SkeletonComponent from '@/components/CardSkeletons';

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
    isLoading,
  } = props;

  const myRole = role?.split('_');

  // Capitalize the first letter of each word and convert the rest to lowercase
  const capitalizedWords = myRole?.map(function (word) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
  });

  // Join the words back together with spaces
  const capitalizedRole = capitalizedWords?.join(' ');

  return (
    <Box sx={styles.cardWrapper(theme)}>
      <Box
        sx={{
          color: theme?.palette?.primary?.light,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {isLoading ? (
          <SkeletonComponent numberOfSkeletons={1} />
        ) : (
          <Box display="flex" flexWrap="wrap">
            <Box
              sx={{
                position: 'relative',
                '&:hover .edit-Icon': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  height: 120,
                  width: 120,
                  borderRadius: '21px',
                  display: 'flex',
                  flexWrap: 'wrap',
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
                  {capitalizedRole}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  mt: '16px',
                }}
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
        )}
      </Box>
      {editBtn && (
        <PermissionsGuard
          permissions={[ORG_ADMIN_USERS_PERMISSIONS?.EDIT_PROFILE]}
        >
          <Button onClick={handleEditProfile}>
            Edit Profile
            <EditColoredIcon />
          </Button>
        </PermissionsGuard>
      )}
    </Box>
  );
};

export default ProfileCard;
