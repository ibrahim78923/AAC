import { Box, Grid, Typography, useTheme } from '@mui/material';
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
    <Grid container>
      <Grid item xs={12} height={{ md: 88, xs: 115 }}>
        <Box sx={styles?.boxMain(isborderbottom, theme)}>
          <Box marginLeft={2}>
            <Avatar
              alt=""
              src={icon?.src}
              sx={{ width: '2.063rem', height: '2rem' }}
            />
          </Box>
          <Box>
            <Typography
              sx={styles?.recentActivitiesText(theme)}
              variant="body3"
            >
              <span style={styles?.recentActivitiesTextBoldWord(theme)}>
                John Doe
              </span>
              {recentActivityText}
              <span style={styles?.recentActivitiesTextBoldWord(theme)}>
                {' '}
                Mark Dyson
              </span>
            </Typography>
            <Typography sx={styles?.recentActivitiesTextPassword(theme)}>
              {recentActivityTextOne}
            </Typography>
            <Typography
              sx={styles?.recentActivitiesTextDateTimeDetail(theme)}
              variant="body3"
            >
              {recentActivityTextTwo}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
