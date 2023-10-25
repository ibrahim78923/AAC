import { Box, Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivitiesDashboardCard';

export const RecentActivitiesDashboardCard = ({
  icon,
  recentactivitytext,
  recentactivitytextone,
  recentactivitytexttwo,
}: any) => {
  return (
    <Card sx={styles?.CardMain}>
      <Box sx={{ marginLeft: 2 }}>
        <Avatar alt="" src={icon?.src} sx={{ width: '33px', height: '32px' }} />
      </Box>
      <Box>
        <Typography sx={styles?.RecentActivityText}>
          <b style={styles?.RecentActivityTextBoldWord}>John Doe</b>
          {recentactivitytext}
          <b style={styles?.RecentActivityTextBoldWord}> Mark dyson</b>
        </Typography>
        <Typography sx={styles?.RecentActivityTextPassword}>
          {recentactivitytextone}
        </Typography>
        <Typography sx={styles?.RecentActivityTextDateTimeDetail}>
          {recentactivitytexttwo}
        </Typography>
      </Box>
    </Card>
  );
};
