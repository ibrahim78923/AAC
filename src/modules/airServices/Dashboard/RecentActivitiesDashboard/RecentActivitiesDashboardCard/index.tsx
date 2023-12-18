import { Box, Grid, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivitiesDashboardCard.styles';
import dayjs from 'dayjs';

export const RecentActivitiesDashboardCard = ({
  icon,
  recentActivity,
  recentActivityRequest,
  isBorderBottom,
}: any) => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={styles?.boxMain(isBorderBottom, theme)} overflow={'scroll'}>
          <Box marginLeft={2}>
            <Avatar
              alt=""
              src={icon?.src}
              sx={{ width: '2.063rem', height: '2rem' }}
            />
          </Box>
          <Box>
            <Typography color={'grey.[600]'} variant="body3">
              <Typography
                component="span"
                color="custom.bright"
                variant="subtitle2"
              >
                John Doe
              </Typography>
              {recentActivity}
              <Typography
                component="span"
                color="custom.bright"
                variant="subtitle2"
              >
                {' '}
                Mark Dyson
              </Typography>
            </Typography>
            <Typography
              variant="body3"
              component={'p'}
              color={'grey.[800]'}
              fontWeight={700}
            >
              {recentActivityRequest}
            </Typography>
            <Typography color={'grey?.[600]'} component={'p'} variant="body3">
              {dayjs(new Date())?.format('ddd, MMM D, YYYY, h:mm A')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
