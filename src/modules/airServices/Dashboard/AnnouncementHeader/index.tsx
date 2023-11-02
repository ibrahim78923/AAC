import { Box, Typography } from '@mui/material';

export const AnnouncementHeader = ({}: any) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: 3,
        }}
      >
        <Typography variant="h4">Announcements</Typography>
      </Box>
    </>
  );
};
