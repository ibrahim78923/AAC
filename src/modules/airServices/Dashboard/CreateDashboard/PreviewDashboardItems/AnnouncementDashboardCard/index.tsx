import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './AnnouncementDashboardCard.styles';

export const AnnouncementDashboardCard = ({
  icon,
  Announcementtext,
  Announcementtextone,
  Announcementtexttwo,
  isBorderBottom,
}: any) => {
  return (
    <Box sx={styles?.boxMain(isBorderBottom)}>
      <Box sx={{ marginLeft: 3, marginTop: 1 }}>
        <Typography sx={styles?.announcementText}>
          {Announcementtext}
        </Typography>
        <Typography sx={styles?.announcementTextOne}>
          {Announcementtextone}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          {Announcementtexttwo}
        </Typography>
      </Box>
    </Box>
  );
};
