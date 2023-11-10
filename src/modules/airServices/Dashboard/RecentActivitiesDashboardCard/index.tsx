import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivitiesDashboardCard.styles';

export const RecentActivitiesDashboardCard = ({
  icon,
  recentActivityText,
  recentActivityTextOne,
  recentActivityTextTwo,
  isborderbottom,
}: any) => {
  const theme = useTheme();
  return (
    <Box sx={styles?.boxMain(isborderbottom, theme)}>
      <Box marginLeft={2}>
        <Avatar
          alt=""
          src={icon?.src}
          sx={{ width: '2.063rem', height: '2rem' }}
        />
      </Box>
      <Box>
        <Typography sx={styles?.recentActivitiesText(theme)}>
          <span style={styles?.recentActivitiesTextBoldWord(theme)}>
            John Doe
          </span>
          {recentActivityText}
          <span style={styles?.recentActivitiesTextBoldWord(theme)}>
            {' '}
            Mark dyson
          </span>
        </Typography>
        <Typography sx={styles?.recentActivitiesTextPassword(theme)}>
          {recentActivityTextOne}
        </Typography>
        <Typography sx={styles?.recentActivitiesTextDateTimeDetail(theme)}>
          {recentActivityTextTwo}
        </Typography>
      </Box>
    </Box>
  );
};
