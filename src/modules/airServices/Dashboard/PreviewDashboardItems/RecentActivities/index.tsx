import { Box, Button, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './RecentActivities.styles';
import { v4 as uuidv4 } from 'uuid';
import { recentActivitiesDashboardCardData } from './RecentActivities.data';
import { CardWrapper } from '../CardWrapper';
import { ClipboardTickImage } from '@/assets/images';
export const RecentActivities = () => {
  const theme = useTheme();
  return (
    <CardWrapper>
      <Box marginLeft={2}>
        <Typography variant="h5">Recent Activities</Typography>
      </Box>
      <Box marginTop={2} key={uuidv4()}>
        {recentActivitiesDashboardCardData?.map((item, index) => (
          <Box key={uuidv4()}>
            <Box
              sx={styles?.boxMain(
                recentActivitiesDashboardCardData?.length - 1 !== index,
                theme,
              )}
            >
              <Box marginLeft={2}>
                <Avatar
                  alt=""
                  src={ClipboardTickImage?.src}
                  sx={{ width: '2.063rem', height: '2rem' }}
                />
              </Box>
              <Box>
                <Typography sx={styles?.recentActivitiesText(theme)}>
                  <span style={styles?.recentActivitiesTextBoldWord(theme)}>
                    John Doe
                  </span>{' '}
                  Updated ticket Request for
                  <span style={styles?.recentActivitiesTextBoldWord(theme)}>
                    {' '}
                    Mark dyson
                  </span>
                </Typography>
                <Typography sx={styles?.recentActivitiesTextPassword(theme)}>
                  {item?.activity}
                </Typography>
                <Typography
                  sx={styles?.recentActivitiesTextDateTimeDetail(theme)}
                >
                  {item?.date}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display={'flex'} justifyContent={'center'} marginBottom={1}>
        <Button variant="text">View All</Button>
      </Box>
    </CardWrapper>
  );
};
