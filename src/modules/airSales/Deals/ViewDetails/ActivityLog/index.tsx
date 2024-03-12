import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { ActivityLogImage } from '@/assets/images';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';
import useActivitylog from './useActivitylog';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const ActivityLog = () => {
  const { theme } = useNameWithStyledWords();
  const { activitylogData } = useActivitylog();

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Activity Log </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container>
          {activitylogData?.activitylogs?.map((item: any) => (
            <Grid item xs={12} key={uuidv4()}>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Box>
                  <Image
                    src={ActivityLogImage}
                    alt="activity-log"
                    width={50}
                    height={50}
                  />
                </Box>
                <Box sx={{ width: '50vw' }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme?.palette?.primary?.main,
                        fontWeight: 400,
                      }}
                    >
                      {item?.performedByName}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme?.palette?.custom?.main,
                        fontWeight: 400,
                      }}
                    >
                      {item?.activityType}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme?.palette?.primary?.main,
                        fontWeight: 400,
                      }}
                    >
                      {item?.moduleName}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.main }}
                  >
                    {dayjs(item?.createdAt).format(DATE_FORMAT?.UI)} {}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: '1px',
                  backgroundColor: theme?.palette?.grey[700],
                  mx: 2.5,
                  height: '40px',
                  my: 1,
                }}
              ></Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ActivityLog;
