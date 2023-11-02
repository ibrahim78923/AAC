import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivitiesDashboardCard.styles';

export const RecentActivitiesDashboardCard = ({
  icon,
  recentActivityText,
  recentActivityTextOne,
  recentactivitytextTwo,
  isborderbottom,
}: any) => {
  return (
    <Box sx={styles?.boxMain(isborderbottom)}>
      <Box sx={{ marginLeft: 2 }}>
        <Avatar
          alt=""
          src={icon?.src}
          sx={{ width: '2.063rem', height: '2rem' }}
        />
      </Box>
      <Box>
        <Typography sx={styles?.recentActivitiesText}>
          <span style={styles?.recentActivitiesTextBoldWord}>John Doe</span>
          {recentActivityText}
          <span style={styles?.recentActivitiesTextBoldWord}> Mark dyson</span>
        </Typography>
        <Typography sx={styles?.recentActivitiesTextPassword}>
          {recentActivityTextOne}
        </Typography>
        <Typography sx={styles?.recentActivitiesTextDateTimeDetail}>
          {recentactivitytextTwo}
        </Typography>
      </Box>
    </Box>
  );
};
