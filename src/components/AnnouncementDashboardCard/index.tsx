import { Box, Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './AnnouncementDashboardCardstyles';

export const AnnouncementDashboardCard = ({
  icon,
  Announcementtext,
  Announcementtextone,
  Announcementtexttwo,
}: any) => {
  return (
    <Card sx={styles?.CardMain}>
      <Box sx={{ marginLeft: 3, marginTop: 1 }}>
        <Typography sx={styles?.Announcementtext}>
          {Announcementtext}
        </Typography>
        <Typography sx={styles?.Announcementtextone}>
          {Announcementtextone}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt=""
          src={icon?.src}
          sx={{ width: '18px', height: '18px', marginRight: '10px' }}
        />
        <Typography sx={styles?.Announcementtexttwo}>
          {Announcementtexttwo}
        </Typography>
      </Box>
    </Card>
  );
};
