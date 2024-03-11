import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';

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

const ActivityLog = ({ companyId }: any) => {
  const { theme } = useNameWithStyledWords();

  const filterPayloadValues = {
    recordType: 'companies',
    recordId: companyId,
  };

  const { data } = useGetSubActivityLogQuery({
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
          {isNullOrEmpty(data?.data?.activitylogs) && (
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', color: theme?.palette?.error?.main }}
            >
              No Activity
            </Typography>
          )}
          <Grid container>
            {data?.data?.activitylogs?.map((item: any, index: any) => (
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
                    <Typography
                      sx={{
                        color: theme?.palette?.primary?.main,
                        fontSize: '18px',
                      }}
                    >
                      {' '}
                      {item?.moduleName}{' '}
                      <span
                        style={{ color: 'black', textTransform: 'lowercase' }}
                      >
                        {' '}
                        Was {item?.activityType} By{' '}
                      </span>{' '}
                      {item?.performedByName}{' '}
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
            ))}
          </Grid>
        </Box>
      </Box>
    </PermissionsGuard>
  );
};

export default ActivityLog;
