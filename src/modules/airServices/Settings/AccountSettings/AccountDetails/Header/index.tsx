import {
  Typography,
  Box,
  useTheme,
  Avatar,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';
import { EmailIcon, PhoneIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useHeader } from './useHeader';
import Chip from '@mui/material/Chip';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import { generateImage } from '@/utils/avatarUtils';
import { IPropsAccountDetails } from '../AccountDetails.interface';

export const Header = (props: IPropsAccountDetails) => {
  const theme = useTheme();
  const { profileDetail } = props;
  const {
    handleFileChange,
    isHovered,
    setIsHovered,
    fullScreenPosition,
    router,
    patchProfileAvatarStatus,
  } = useHeader();
  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      p={{ xs: 1, sm: 2 }}
      borderRadius={2}
      mb={1}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <ArrowBackIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router?.push({
                pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
              });
            }}
          />
          <Typography variant="h5">Account Details</Typography>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ACCOUNT_DETAILS,
        ]}
      >
        <Box display={'flex'} gap={{ xs: 1, sm: 2 }} mt={2}>
          <Box
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <label htmlFor="profilePictureInput">
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={patchProfileAvatarStatus?.isLoading}
              />
              {!patchProfileAvatarStatus?.isLoading ? (
                <Avatar
                  src={generateImage(profileDetail?.avatar?.url)}
                  sx={{ height: 90, width: 90 }}
                  alt="user"
                  variant="rounded"
                />
              ) : (
                <Box
                  sx={{ height: 90, width: 90 }}
                  display="flex"
                  alignItems="center"
                  justifyContent={'center'}
                >
                  <CircularProgress />
                </Box>
              )}
              {isHovered && (
                <Box
                  position="absolute"
                  {...fullScreenPosition}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ background: 'white', opacity: 0.5 }}
                >
                  <BorderColorIcon sx={{ color: 'black' }} />
                </Box>
              )}
            </label>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            gap={1}
          >
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={1}
            >
              <Typography variant="h4">
                {profileDetail?.firstName + ' ' + profileDetail?.lastName}
              </Typography>
              <Chip
                label={profileDetail?.role}
                sx={{
                  backgroundColor: 'success.lighter',
                  color: 'success.main',
                }}
              />
            </Box>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={1}
            >
              <Box display={'flex'} gap={1}>
                <EmailIcon />
                <Typography variant="body2">{profileDetail?.email}</Typography>
              </Box>
              <Box display={'flex'} gap={1}>
                <PhoneIcon />
                <Typography variant="body2">
                  {profileDetail?.phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </PermissionsGuard>
    </Box>
  );
};
