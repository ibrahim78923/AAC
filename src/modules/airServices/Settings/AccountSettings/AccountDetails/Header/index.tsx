import { Typography, Box, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';
import { EmailIcon, PhoneIcon } from '@/assets/icons';
import { UserRequesterImage } from '@/assets/images';
import Image from 'next/image';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useHeader } from './useHeader';
import Chip from '@mui/material/Chip';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

export const Header = (props: any) => {
  const theme = useTheme();
  const { profileDetail } = props;
  const {
    handleFileChange,
    isHovered,
    setIsHovered,
    fullScreenPosition,
    router,
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
        sx={{ cursor: 'pointer' }}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <ArrowBackIcon
            onClick={() => {
              router?.push({
                pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
              });
            }}
          />
          <Typography variant="h5">Account Detail</Typography>
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
              />

              <Image
                src={
                  `${process.env.NEXT_PUBLIC_IMG_URL}${profileDetail?.avatar?.url}` ||
                  UserRequesterImage
                }
                width={90}
                height={90}
                alt="user"
              />
              {isHovered && (
                <Box
                  position="absolute"
                  {...fullScreenPosition}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={3}
                  sx={{ background: 'black', opacity: 0.5 }}
                >
                  <BorderColorIcon sx={{ color: 'white' }} />
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
            <Box display={'flex'} gap={1}>
              <Typography variant="h4">{profileDetail?.firstName}</Typography>
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
