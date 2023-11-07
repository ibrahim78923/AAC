import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, useTheme, Divider, IconButton } from '@mui/material';
import { styles } from './AnnouncementHeader.styles';

export const AnnouncementHeader = () => {
  const theme = useTheme();
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
        <IconButton>
          <ViewDetailSharedIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
};
