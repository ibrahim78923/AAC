import { Box, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

import { LogoIcon } from '@/assets/icons';

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme?.palette?.background?.default,
}));

const LoadingScreen = () => {
  return (
    <RootStyle>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <LogoIcon />
        <Box>
          <Typography variant="h4">Air Applecart</Typography>
        </Box>
      </Box>
    </RootStyle>
  );
};

export default LoadingScreen;
