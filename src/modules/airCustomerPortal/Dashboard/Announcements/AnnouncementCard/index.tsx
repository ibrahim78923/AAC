import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/lib/date-time';
import { Box, Typography } from '@mui/material';
import { AnnouncementCardPropsI } from '../Announcements.interface';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';

export const AnnouncementCard = (props: AnnouncementCardPropsI) => {
  const { data, index } = props;
  return (
    <Box
      key={data?._id}
      sx={{ p: 2 }}
      borderBottom={
        index !== data?.announcements?.length - 1 ? '1px solid' : ''
      }
      borderColor={'custom.off_white'}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
      >
        <TruncateText text={data?.title?.toLowerCase()} />
        <UserInfo
          nameInitial={fullNameInitial(
            data?.createdBy?.firstName,
            data?.createdBy?.lastName,
          )}
          name={fullName(data?.createdBy?.firstName, data?.createdBy?.lastName)}
          avatarSrc={data?.createdBy?.avatar?.url}
        />
      </Box>
      <Typography color={'grey.900'} fontSize={'0.75rem'} mt={1}>
        {formatTimeDifference(data?.createdAt)}
      </Typography>
    </Box>
  );
};
