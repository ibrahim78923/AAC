import Image from 'next/image';
import { isNullOrEmpty } from '@/utils';
import { Box, Typography } from '@mui/material';
import {
  CalendarActiveImage,
  // CallActiveImage,
  // MessageActiveImage,
  // NotesAvatarImage,
} from '@/assets/images';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { styles } from '../ViewDetails.style';
import { useGetSubActivityLogQuery } from '@/services/orgAdmin/activity-log';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

const ActivityLog = ({ contactId }: any) => {
  const { theme } = useNameWithStyledWords();
  const filterPayloadValues = {
    recordType: 'contacts',
    recordId: contactId,
  };

  const { data } = useGetSubActivityLogQuery({
    params: { ...filterPayloadValues },
  });

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Activities</Typography>
      <Box>
        {isNullOrEmpty(data?.data?.activitylogs) && (
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', color: theme?.palette?.error?.main }}
          >
            No Activity
          </Typography>
        )}

        {data?.data?.activitylogs?.map((item: any) => (
          <Box sx={styles?.logCont} key={item?._id}>
            <Box sx={styles?.log}>
              <Box sx={styles?.logImage}>
                <Image src={CalendarActiveImage} alt="image" />
              </Box>
              <Box>
                <Box sx={styles?.logTitle}>
                  <Box component="span" sx={{ textTransform: 'capitalize' }}>
                    {item?.moduleName}{' '}
                  </Box>
                  <Box component="span" sx={styles?.activityType}>
                    {item?.activityType}{' '}
                  </Box>
                  <Box component="span">by </Box>

                  <Box component="span" sx={styles?.logPerformedBy}>
                    {item?.performedByName}
                  </Box>
                </Box>
                <Typography
                  fontWeight={400}
                  fontSize="12px"
                  sx={{ color: (theme: any) => theme?.palette?.custom?.main }}
                >
                  {dayjs(item?.createdAt).format(DATE_TIME_FORMAT?.DMYhmma)}
                </Typography>
              </Box>
            </Box>

            {/* {index !== ActivitiesLog?.length - 1 && (
              <Box
                sx={{
                  width: '1px',
                  backgroundColor: theme?.palette?.grey[700],
                  mx: 2.5,
                  height: '40px',
                  my: 1,
                }}
              ></Box>
            )} */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityLog;
