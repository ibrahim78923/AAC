import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { Avatar, Box, Typography } from '@mui/material';

export const AnnouncementCard = (props: any) => {
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
          {data?.title > 20 ? `${data?.title?.slice(0, 10)} ...` : data?.title}
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Avatar
            src={generateImage(data?.userAvatar)}
            // src={data?.user?.profileImage}
            alt=""
            sx={{
              width: 28,
              height: 28,
              backgroundColor: 'primary.main',
            }}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(data?.userName)}
            </Typography>
          </Avatar>
          <Typography variant="body3" color={'blue.main'} fontWeight={500}>
            {fullName(data?.userName)}
          </Typography>
        </Box>
      </Box>
      <Typography color={'grey.900'} fontSize={'0.75rem'} mt={1}>
        {formatTimeDifference(data?.createdAt)}
      </Typography>
    </Box>
  );
};
