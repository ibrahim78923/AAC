import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { Avatar, Box, Typography } from '@mui/material';
import { AnnouncementCardPropsI } from '../Announcements.interface';

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
        <Typography fontWeight={600} color={'blue.main'}>
          {truncateText(data?.title)}
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Avatar
            src={generateImage(data?.createdBy?.avatar?.url)}
            alt=""
            sx={{
              width: 28,
              height: 28,
              backgroundColor: 'primary.main',
            }}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(
                data?.createdBy?.firstName,
                data?.createdBy?.lastName,
              )}
            </Typography>
          </Avatar>
          <Typography variant="body3" color={'blue.main'} fontWeight={500}>
            {fullName(data?.createdBy?.firstName, data?.createdBy?.lastName)}
          </Typography>
        </Box>
      </Box>
      <Typography color={'grey.900'} fontSize={'0.75rem'} mt={1}>
        {formatTimeDifference(data?.createdAt)}
      </Typography>
    </Box>
  );
};
