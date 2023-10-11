import {
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { editImage } from '@/assets/images';
import { activityStyles } from './Activity.style';
import { activities } from './Activity.data';
import { v4 as uuidv4 } from 'uuid';
import { ActivityDataI } from './Activity.interface';

const Activity = () => {
  const theme = useTheme();
  return (
    <Grid container sx={{ pt: '40px' }}>
      {activities.map((activity: ActivityDataI) => (
        <Grid
          container
          key={uuidv4()}
          sx={{ mb: '16px', ml: { lg: '71px', xs: '0px' } }}
        >
          <Grid item lg={2} xs={12} sx={{ pb: '40px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ ...activityStyles.activityTimeDetails(theme) }}>
                {activity.timestamp}
              </Typography>
              <Image src={editImage} alt="Edit" width="18px" height="18px" />
            </Box>
          </Grid>

          <Grid item lg={10} xs={12}>
            <Box sx={{ ml: '16px' }}>
              <Typography sx={{ ...activityStyles.renewCreateText(theme) }}>
                {activity.Renewed ? 'Renewed' : 'Created'}
              </Typography>
            </Box>
            <Box sx={{ ml: '16px', mt: '4px' }}>
              <Typography sx={{ ...activityStyles.datestamp(theme) }}>
                {activity.datestamp}
              </Typography>
            </Box>
            <Box sx={{ ml: '16px', mt: '8px' }}>
              <Button sx={{ backgroundColor: '#EBFAF8' }}>
                {activity.descriptionone}
              </Button>
              <Button sx={{ backgroundColor: '#EBFAF8', ml: '12px' }}>
                {activity.descriptiontwo}
              </Button>
            </Box>
          </Grid>

          <Grid
            container
            item
            lg={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: '16px' }}
          >
            <Box
              sx={{ display: { lg: 'flex', xs: 'none' }, alignItems: 'center' }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  borderRadius: '20px',
                  background: '#D7F4F0',
                  width: '4px',
                  height: '49px',
                  mr: '16px',
                  mb: '16px',
                }}
              />
            </Box>
          </Grid>

          <Grid lg={10} sx={{ mt: '16px' }}></Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Activity;
