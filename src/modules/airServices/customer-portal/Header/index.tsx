import { Box, Button, Typography } from '@mui/material';

export const Header = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2.4,
          py: 1.3,
          borderRadius: '0.75rem',
          background: 'red',
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.875rem' }}
        >
          Customer Portal - Dashboard
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.4,
          }}
        >
          <Button variant="outlined" color="secondary">
            revert
          </Button>
          <Button variant="contained">new</Button>
        </Box>
      </Box>
    </>
  );
};
