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
import { DotsBoldIcon } from '@/assets/icons';

const ScheduledSMS = () => {
  const { theme, statusTag } = useScheduledSMS();

  return (
    <Box sx={styles?.scheduledSMSCardStyle}>
      <Box className="scheduledSMSHeader">
        <Typography variant="h4" sx={styles?.heading(theme)}>
          Scheduled SMS
        </Typography>
        <Button
          variant="outlined"
          sx={{ background: theme?.palette?.primary?.light }}
          className="small"
        >
          View All
        </Button>
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
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight="600"
                    component="div"
                    sx={{ color: theme?.palette?.blue?.light }}
                  >
                    {item?.title}
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <Box sx={styles?.cardHeader}>
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: `${statusTag(item?.status)}`,
                          borderRadius: '50%',
                        }}
                      />
                      <Typography variant="body2">{item?.status}</Typography>
                    </Box>
                    <DotsBoldIcon />
                  </Stack>
                </Stack>
                <Typography
                  variant="body2"
                  color={theme?.palette?.custom?.dim_blue}
                >
                  {item?.desc}
                </Typography>
                <Stack
                  direction={{ sx: 'column', sm: 'row' }}
                  justifyContent="space-between"
                >
                  <Stack direction="row" gap={0.5}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{ color: theme?.palette?.primary?.main }}
                    >
                      Created:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                      {item?.created}
                    </Typography>
                  </Stack>

                  <Stack direction="row" gap={0.5}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{ color: theme?.palette?.primary?.main }}
                    >
                      Recipients:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                      {item?.recipients}
                    </Typography>
                  </Stack>
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
