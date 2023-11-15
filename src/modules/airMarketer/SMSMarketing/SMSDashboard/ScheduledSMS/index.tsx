import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import useScheduledSMS from './useScheduledSMS';

import { scheduledSmsArray } from '../SMSDashboard.data';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './ScheduledSMS.style';

const ScheduledSMS = () => {
  const { theme, statusTag } = useScheduledSMS();

  return (
    <Box sx={styles?.scheduledSMSCardStyle}>
      <Box className="scheduledSMSHeader">
        <Typography variant="h4" sx={styles?.heading(theme)}>
          Scheduled SMS
        </Typography>
        <Button variant="contained">View All</Button>
      </Box>
      <Box className="cardWrapper">
        {scheduledSmsArray?.map((item: any) => {
          return (
            <Card sx={{ my: 1 }} key={uuidv4()}>
              <CardContent>
                <Stack
                  direction={{ sx: 'column', sm: 'row' }}
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.title}
                  </Typography>
                  <Box sx={styles?.cardHeader}>
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: `${statusTag(item?.status)}`,
                        borderRadius: '50%',
                      }}
                    />
                    {item?.status}
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {item?.desc}
                </Typography>
                <Stack
                  direction={{ sx: 'column', sm: 'row' }}
                  justifyContent="space-between"
                >
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ color: theme?.palette?.primary?.main }}
                    >
                      {' '}
                      Created:{' '}
                    </Typography>
                    {item?.created}
                  </Typography>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ color: theme?.palette?.primary?.main }}
                    >
                      {' '}
                      Recipients:{' '}
                    </Typography>
                    {item?.recipients}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default ScheduledSMS;
