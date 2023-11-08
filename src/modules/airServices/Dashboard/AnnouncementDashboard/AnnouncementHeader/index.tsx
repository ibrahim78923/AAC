import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { styles } from './AnnouncementHeader.styles';
import { useAnnouncementDashboard } from '../AnnouncementDashboardDrawer/useAnnouncementDashboard';
import AnnouncementDashboardDrawer from '../AnnouncementDashboardDrawer';

export const AnnouncementHeader = () => {
  const { setIsDrawerOpen, isDrawerOpen, handleIconButtonClick, theme } =
    useAnnouncementDashboard();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={2}
        mb={1}
      >
        <Typography variant="h6" sx={styles?.announcementText(theme)}>
          Announcements
        </Typography>
        <IconButton onClick={handleIconButtonClick}>
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
