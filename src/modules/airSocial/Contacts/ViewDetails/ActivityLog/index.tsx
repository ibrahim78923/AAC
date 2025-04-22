import Image from 'next/image';
import { Box, Skeleton, Typography } from '@mui/material';
import { CalendarActiveImage } from '@/assets/images';
import { styles } from '../ViewDetails.style';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS } from '@/constants/permission-keys';
import useActivityLog from './useActivityLog';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { capitalizeFirstLetter, normalizeLabel } from '@/utils/api';

const ActivityLog = ({ contactId }: any) => {
  const { theme, data, isError, isFetching, isLoading, isSuccess } =
    useActivityLog(contactId);

  return (
    <PermissionsGuard
      permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.VIEW_ACTIVITY_LOG]}
    >
      <Box sx={styles?.horizontalTabsBox}>
        <Typography variant="h4">Activities</Typography>
        <Box>
          {(isLoading || isFetching) &&
            Array(3)
              .fill(null)
              .map(() => (
                <Skeleton
                  key={uuidv4()}
                  animation="wave"
                  variant="rectangular"
                  width={'100%'}
                  height={110}
                  sx={{
                    bgcolor: theme?.palette?.grey?.[300],
                    borderRadius: '6px',
                    mt: '24px',
                  }}
                />
              ))}
          {isError && <ApiErrorState />}

          {!(isLoading || isFetching) &&
          isSuccess &&
          data?.data?.activitylogs.length === 0 ? (
            <NoData />
          ) : (
            data?.data?.activitylogs?.map((item: any) => (
              <Box sx={styles?.logCont} key={item?._id}>
                <Box sx={styles?.log}>
                  <Box sx={styles?.logImage}>
                    <Image src={CalendarActiveImage} alt="image" />
                  </Box>

                  <Box>
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
                      fontWeight={400}
                      fontSize="12px"
                      sx={{
                        color: (theme: any) => theme?.palette?.custom?.main,
                      }}
                    >
                      {dayjs(item?.createdAt).format(DATE_TIME_FORMAT?.DMYhmma)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </PermissionsGuard>
  );
};

export default ActivityLog;
