import { Box, Typography } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { TruncateText } from '@/components/TruncateText';
import { LogInfo } from '@/components/LogInfo';
import { RecentActivitiesIcon } from '@/assets/icons';
import { otherDateFormat } from '@/lib/date-time';

export const RecentActivitiesCard = (props: any) => {
  const { data } = props;
  return (
    <Box
      display="flex"
      gap={2}
      bgcolor="common.white"
      borderBottom="1px solid"
      borderColor="grey.700"
      px={2}
      py={1.5}
    >
      <Box>
        <RecentActivitiesIcon />
      </Box>
      <Box>
        <LogInfo
          performer={fullName(
            data?.userDetails?.firstName,
            data?.userDetails?.lastName,
          )}
          logType={`has ${data?.activityType?.toLowerCase()}`}
          log={
            <TruncateText text={data?.moduleName} size={35} isCapital={false} />
          }
          logColor="custom.bright"
          logProps={{
            sx: {
              wordBreak: 'break-all',
            },
          }}
        />
        <Typography color={'grey.600'} component={'p'} variant="body3">
          {otherDateFormat(data?.createdAt, DATE_TIME_FORMAT?.DMDHMA)}
        </Typography>
      </Box>
    </Box>
  );
};
