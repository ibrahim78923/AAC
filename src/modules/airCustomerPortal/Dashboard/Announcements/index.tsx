import { Box, Typography, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from './Announcements.style';
import { CardLayout } from '../CardLayout';
import { v4 as uuidv4 } from 'uuid';
import { useAnnouncements } from './useAnnouncements';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';

export const Announcements = ({ title, handleViewMore }: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, announcementsWrapper, avatarWrapper } = styles;
  const { data, isLoading, isFetching, isError } = useAnnouncements();

  return (
    <CardLayout title={title} btnPosition="center" btnClick={handleViewMore}>
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} />
      ) : (
        <Box my="0.75rem">
          {!!data?.data?.articles?.length ? (
            data?.data?.articles?.map(({ user, ...announcement }: any) => (
              <Box key={uuidv4()} sx={mainWrapper}>
                <Divider />
                <Box sx={announcementsWrapper}>
                  <Typography fontWeight={600} color={palette?.blue?.main}>
                    {announcement?.title}
                  </Typography>
                  <Box sx={avatarWrapper}>
                    <Avatar src={user?.profileImage} />
                    <Typography
                      variant="body3"
                      color={palette?.blue?.main}
                      fontWeight={500}
                    >{`${user?.firstName} ${user?.lastName}`}</Typography>
                  </Box>
                </Box>
                <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                  {announcement?.announcementTime}
                </Typography>
              </Box>
            ))
          ) : (
            <NoData height={'100%'} />
          )}
        </Box>
      )}
    </CardLayout>
  );
};
