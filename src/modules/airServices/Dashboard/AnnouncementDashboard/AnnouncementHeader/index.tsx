import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { useAddAnnouncement } from '../AddAnnouncement/useAddAnnouncement ';
import AnnouncementDashboardDrawer from '../AddAnnouncement';

export const AnnouncementHeader = () => {
  const { setIsDrawerOpen, isDrawerOpen, handleIconButton } =
    useAddAnnouncement();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={2}
        mb={1}
      >
        <Typography variant="h5">Announcements</Typography>
        <IconButton onClick={handleIconButton}>
          <ViewDetailSharedIcon />
        </IconButton>
      </Box>
      <Divider />
      <AnnouncementDashboardDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};
