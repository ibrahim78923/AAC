import { Typography, Box } from '@mui/material';
import { EmailIcon, PhoneIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useHeader } from './useHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { IPropsAccountDetails } from '../AccountDetails.interface';
import { AIR_SERVICES } from '@/constants/routes';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CustomCircularProgress } from '@/components/ProgressBars/CustomCircularProgress';

export const Header = (props: IPropsAccountDetails) => {
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
      border={`.1rem solid `}
      borderColor="grey.700"
      p={{ xs: 1, sm: 2 }}
      borderRadius={2}
      mb={1}
    >
      <PageTitledHeader
        title="Account Details"
        titleVariant="h5"
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
          });
        }}
      />
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
                <CustomAvatar
                  avatarSrc={profileDetail?.avatar?.url}
                  avatarSize={{ height: 90, width: 90, variant: 'rounded' }}
                  nameInitial={fullNameInitial(
                    profileDetail?.firstName,
                    profileDetail?.lastName,
                  )}
                />
              ) : (
                <Box
                  sx={{ height: 90, width: 90 }}
                  display="flex"
                  alignItems="center"
                  justifyContent={'center'}
                >
                  <CustomCircularProgress />
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
              alignItems={'center'}
            >
              <Typography variant="h4">
                {fullName(profileDetail?.firstName, profileDetail?.lastName)}
              </Typography>
              <CustomChip
                backgroundColor={'success.lighter'}
                textColor={'success.main'}
                label={profileDetail?.role}
              />
            </Box>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={1}
              alignItems={'center'}
            >
              <Box display={'flex'} gap={1}>
                <EmailIcon />
                <Typography variant="body2">{profileDetail?.email}</Typography>
              </Box>
              {!!profileDetail?.phoneNumber && (
                <Box display={'flex'} gap={1}>
                  <PhoneIcon />
                  <Typography variant="body2">
                    {profileDetail?.phoneNumber}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </PermissionsGuard>
    </Box>
  );
};
