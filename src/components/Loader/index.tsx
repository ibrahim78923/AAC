import { useTheme } from '@emotion/react';
import { Box, CircularProgress, alpha } from '@mui/material';

const IsLoading = ({ isLoading }: any) => {
  const theme: any = useTheme();

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: alpha(theme.palette.background.paper, 0.775),
        zIndex: 99999,
      }}
    >
      <CircularProgress
        sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </Box>
  );
};

export default IsLoading;
