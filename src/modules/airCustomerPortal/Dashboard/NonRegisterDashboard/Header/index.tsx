import { Box, Typography, useTheme } from '@mui/material';
import { WelcomeCardImage } from '@/assets/images';

export const Header = () => {
  const { palette }: any = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={1.5}
        borderRadius={'1rem'}
        border={`.1rem solid ${palette?.grey?.[700]}`}
      >
        <Typography variant="h3">Customer Portal - Dashboard</Typography>
      </Box>

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexDirection={{ xs: 'column', xl: 'row' }}
        alignItems={{ xs: 'start', xl: 'center' }}
        p={3}
        mt={2}
        borderRadius={'1rem'}
        sx={{
          backgroundImage: `url(${WelcomeCardImage?.src})`,
          backgroundColor: 'blue.main',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 110%',
        }}
      >
        <Box flexBasis={{ xs: '100%', xl: '50%' }} color={'white'}>
          <Typography variant="h4" mb={0.5}>
            Welcome to AirApple Cart - Services
          </Typography>
          <Typography variant="body2">
            We are here to help you, Please let us know what you need.
          </Typography>
        </Box>
      </Box>
    </>
  );
};
