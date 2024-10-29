import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { teamActivityData } from '@/mock/modules/airSales/Dashboard/TeamActivity';
import { v4 as uuidv4 } from 'uuid';
import { generateImage } from '@/utils/avatarUtils';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const ActivityDetails = ({ data }: any) => {
  const activitDetails = data ? data : teamActivityData;
  const theme = useTheme();

  return (
    <>
      {activitDetails?.map((teamData: any) => {
        return (
          <Stack
            key={uuidv4()}
            direction={{ sm: 'row', sx: 'column' }}
            alignItems={{ sm: 'center', xs: 'left' }}
            gap={2}
            pb={2}
          >
            <Avatar
              src={generateImage(teamData?.userDetails?.avatar?.url)}
              sx={{ color: theme?.palette?.grey[900], fontSize: '15px' }}
            >
              {`${teamData?.userDetails?.firstName?.charAt(0)?.toUpperCase()}
                ${teamData?.userDetails?.lastName?.charAt(0)?.toUpperCase()}`}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontWeight: '600',
                  color: theme?.palette?.common?.black,
                }}
                variant="body4"
              >
                {teamData?.userDetails?.firstName}{' '}
                {teamData?.userDetails?.lastName}
              </Typography>
              <Typography variant="body4">
                {` ${teamData?.activityType} `}
              </Typography>

              <Typography
                variant="body4"
                sx={{
                  fontWeight: '600',
                  color: theme?.palette?.common?.black,
                }}
              >
                {`${teamData?.moduleName} `}
              </Typography>
              <Typography variant="body4">
                at {dayjs(teamData?.updatedAt)?.format(DATE_FORMAT?.UI)}{' '}
              </Typography>
            </Box>
          </Stack>
        );
      })}
    </>
  );
};
export default ActivityDetails;
