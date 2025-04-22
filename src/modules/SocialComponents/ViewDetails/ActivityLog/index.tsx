import Image from 'next/image';

import { Box, Grid, Skeleton, Typography } from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { ActivityLogImage } from '@/assets/images';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';
import { useGetSubActivityLogQuery } from '@/services/orgAdmin/activity-log';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { isNullOrEmpty } from '@/utils';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetter, normalizeLabel } from '@/utils/api';

const ActivityLog = ({ companyId }: any) => {
  const { theme } = useNameWithStyledWords();

  const filterPayloadValues = {
    recordId: companyId,
  };

  const { data, isLoading } = useGetSubActivityLogQuery({
    params: { ...filterPayloadValues },
  });

  return (
    <PermissionsGuard
      permissions={[
        SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.VIEW_ACTIVITIES,
      ]}
    >
      <Box sx={styles?.horizontalTabsBox}>
        <Typography variant="h4">Activity Log </Typography>
        <Box sx={styles?.horizontalTabsInnnerBox}>
          {isLoading && (
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{ marginRight: '20px' }}
              />
              <Skeleton variant="rectangular" width="100%" height={30} />
            </Box>
          )}
          <Grid container>
            {isNullOrEmpty(data?.data?.activitylogs) && !isLoading ? (
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', color: theme?.palette?.error?.main }}
              >
                No Activity
              </Typography>
            ) : (
              data?.data?.activitylogs?.map((item: any, index: any) => (
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
                        {dayjs(item?.createdAt).format(DATE_FORMAT.UI)} -{' '}
                        {item?.createdAt?.split('T')[1]?.substring(0, 5)}
                      </Typography>
                    </Box>
                  </Box>

                  {index !== data?.data?.activitylogs?.length - 1 && (
                    <Box
                      sx={{
                        width: '1px',
                        backgroundColor: theme?.palette?.grey[700],
                        mx: 2.5,
                        height: '40px',
                        my: 1,
                      }}
                    ></Box>
                  )}
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </PermissionsGuard>
  );
};

export default ActivityLog;
