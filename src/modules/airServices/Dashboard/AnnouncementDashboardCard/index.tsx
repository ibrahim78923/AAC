import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './AnnouncementDashboardCard.styles';

export const AnnouncementDashboardCard = ({
  icon,
  announcementText,
  announcementTextOne,
  announcementTextTwo,
  isborderbottom,
}: any) => {
  const theme = useTheme();
  return (
    <Box sx={styles?.boxMain(isborderbottom, theme)}>
      <Box marginTop={1}>
        <Typography sx={styles?.announcementText}>
          {announcementText}
        </Typography>
        <Typography sx={styles?.announcementTextOne}>
          {announcementTextOne}
        </Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Avatar
          alt=""
          src={icon?.src}
          sx={{
            width: '1.125rem',
            height: '1.125rem',
            marginRight: '0.625rem',
          }}
        />
        <Typography sx={styles?.announcementTextTwo}>
          {announcementTextTwo}
        </Typography>
      </Box>
    </Box>
  );
};
