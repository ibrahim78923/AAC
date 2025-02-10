import { PageNotFoundImage } from '@/assets/images';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';
import { AUTH } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PageNotAccess = ({
  image = PageNotFoundImage,
  message = ' Please contact with your administrator to resolve this issue',

  height = '70vh',
}: any) => {
  const router = useRouter();
  const theme = useTheme();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push(AUTH?.LOGIN);
  };

  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      height={height}
    >
      <Grid item textAlign={'center'}>
        <Box sx={{ gap: '10px', display: 'flex', justifyContent: 'center' }}>
          <LogoAvatar />
        </Box>
        <Typography variant="h3" mt={4} mb={4}>
          You don't have access to any{' '}
          <span style={{ color: theme?.palette?.primary?.main }}>
            Company Account
          </span>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={image} width={0} height={0} alt="Not Found" />
        </Box>
        <Typography variant="h6" mt={4}>
          {message}{' '}
          <span
            style={{
              color: theme?.palette?.error?.dark,
              fontWeight: 800,
              fontSize: '1.4rem',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            Logout
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageNotAccess;
