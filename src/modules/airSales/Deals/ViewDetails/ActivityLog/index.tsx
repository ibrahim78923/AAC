import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { ActivityLogImage } from '@/assets/images';
import { styles } from '../ViewDetails.style';
import { v4 as uuidv4 } from 'uuid';
import useActivitylog from './useActivitylog';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { capitalizeFirstLetter, normalizeLabel } from '@/utils/api';

const ActivityLog = ({ selectedRecId }: any) => {
  const { theme } = useNameWithStyledWords();
  const { activitylogData, isLoading } = useActivitylog(selectedRecId);

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4" mb={2}>
        Activity Log{' '}
      </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        {isLoading ? (
          <SkeletonForm />
        ) : (
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
                    <Typography variant="h5" sx={{ fontWeight: '400' }}>
                      <Box component="span">{item?.performedByName}</Box>{' '}
                      <Box
                        component="span"
                        sx={{ color: theme?.palette?.primary?.main }}
                      >
                        {capitalizeFirstLetter(item?.activityType)}
                      </Box>{' '}
                      <Box
                        component="span"
                        sx={{ color: theme?.palette?.custom?.main }}
                      >
                        {normalizeLabel(item?.module)}
                      </Box>{' '}
                      <Box
                        component="span"
                        sx={{ color: theme?.palette?.primary?.main }}
                      >
                        {item?.moduleName}
                      </Box>{' '}
                      {['REMOVED', 'ASSOCIATED', 'UNASSOCIATED'].includes(
                        item?.activityType,
                      ) && (
                        <>
                          <Box component="span">with</Box>{' '}
                          <Box
                            component="span"
                            sx={{ color: theme?.palette?.custom?.main }}
                          >
                            {normalizeLabel(item?.recordType)}
                          </Box>{' '}
                          <Box
                            component="span"
                            sx={{ color: theme?.palette?.primary?.main }}
                          >
                            {item?.recordData[0]?.name}
                          </Box>
                        </>
                      )}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: theme?.palette?.custom?.main }}
                    >
                      {dayjs(item?.createdAt).format(DATE_TIME_FORMAT?.DMYhmma)}
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
        )}
      </Box>
    </Box>
  );
};

export default ActivityLog;
