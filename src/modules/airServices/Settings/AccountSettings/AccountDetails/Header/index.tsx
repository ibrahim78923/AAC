import { Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';
import { EmailIcon, PhoneIcon } from '@/assets/icons';
import { UserProfileImage } from '@/assets/images';
import Image from 'next/image';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useHeader } from './useHeader';

export const Header = () => {
  const {
    handleFileChange,
    uploadedImage,
    isHovered,
    setIsHovered,
    fullScreenPosition,
    router,
  } = useHeader();

  return (
    <>
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
      <Box display={'flex'} gap={2} mt={2} mb={2}>
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
              src={uploadedImage || UserProfileImage}
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
            <Typography variant="h4">John Doe</Typography>
            <Typography
              p={0.5}
              borderRadius={3}
              color={'success.main'}
              sx={{ backgroundColor: 'success.lighter' }}
              textAlign={'center'}
              variant="body2"
            >
              Admin
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', lg: 'row' }}
            gap={1}
          >
            <Box display={'flex'} gap={1}>
              <EmailIcon />
              <Typography variant="body2">Johndoe@gmail.com</Typography>
            </Box>
            <Box display={'flex'} gap={1}>
              <PhoneIcon />
              <Typography variant="body2">(316) 555-0116</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
