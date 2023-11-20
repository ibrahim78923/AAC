import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivitiesDashboardCard.styles';
import { useRecentActivities } from './useRecentActivities';

export const RecentActivitiesDashboardCard = ({
  icon,
  recentActivityText,
  recentActivityRequestText,
  isBorderBottom,
}: any) => {
  const { theme, currentDate, formatDateTime } = useRecentActivities();

  return (
    <Grid container>
      <Grid item xs={12} height={{ md: 88, xs: 122 }}>
        <Box sx={styles?.boxMain(isBorderBottom, theme)} overflow={'scroll'}>
          <Box marginLeft={2}>
            <Avatar
              alt=""
              src={icon?.src}
              sx={{ width: '2.063rem', height: '2rem' }}
            />
          </Box>
          <Box>
            <Typography color={'grey?.[600]'} variant="body3">
              <Typography
                style={styles?.recentActivitiesTextBoldWord(theme)}
                component="span"
              >
                John Doe
              </Typography>
              {recentActivityText}
              <Typography
                style={styles?.recentActivitiesTextBoldWord(theme)}
                component="span"
              >
                {' '}
                Mark Dyson
              </Typography>
            </Typography>
            <br />
            <Typography variant="body3" color={'grey?.[800]'}>
              {recentActivityRequestText}
            </Typography>
            <br />
            <Typography color={'grey?.[600]'} variant="body3">
              {formatDateTime(currentDate)}{' '}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
