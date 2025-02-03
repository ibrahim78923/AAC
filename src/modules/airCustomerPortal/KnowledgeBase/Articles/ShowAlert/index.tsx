import { CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

export const ShowAlert = (props: any) => {
  const { setAlert } = props;
  useEffect(() => {
    const timeoutId = setTimeout(() => setAlert(false), 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={0.5}
      mt={6}
    >
      <CheckCircle sx={{ color: 'success.main' }} />
      <Typography color="secondary" variant="body2">
        Glad we could helpful. Thanks for the feedback.
      </Typography>
    </Box>
  );
};
