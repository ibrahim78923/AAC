import { Box, Grid, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivitiesDashboardCard.styles';

export const RecentActivitiesDashboardCard = ({
  icon,
  recentActivityText,
  recentActivityTextPassword,
  recentActivityTextDateTime,
  isborderbottom,
}: any) => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={12} height={{ md: 88, xs: 122 }}>
        <Box sx={styles?.boxMain(isborderbottom, theme)} overflow={'scroll'}>
          <Box marginLeft={2}>
            <Avatar
              alt=""
              src={icon?.src}
              sx={{ width: '2.063rem', height: '2rem' }}
            />
          </Box>
          <Box>
            <Typography color={'grey?.[600]'} variant="body3">
              <span style={styles?.recentActivitiesTextBoldWord(theme)}>
                John Doe
              </span>
              {recentActivityText}
              <span style={styles?.recentActivitiesTextBoldWord(theme)}>
                {' '}
                Mark Dyson
              </span>
            </Typography>
            <br />
            <Typography variant="body3" color={'grey?.[800]'}>
              {recentActivityTextPassword}
            </Typography>
            <br />
            <Typography color={'grey?.[600]'} variant="body3">
              {recentActivityTextDateTime}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
