import { Box, Typography, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from './Announcements.style';
import { CardLayout } from '../CardLayout';
import { v4 as uuidv4 } from 'uuid';

export const Announcements = ({ announcementsData }: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, announcementsWrapper, avatarWrapper } = styles;
  return (
    <CardLayout
      title={'Announcements'}
      btnPosition="center"
      btnClick={() => {}}
    >
      <Box my="0.75rem">
        {announcementsData?.map(({ user, ...announcement }: any) => (
          <Box key={uuidv4()} sx={mainWrapper}>
            <Divider />
            <Box sx={announcementsWrapper}>
              <Typography fontWeight={600} color={palette?.blue?.main}>
                {announcement?.title}
              </Typography>
              <Box sx={avatarWrapper}>
                <Avatar src={user?.profileImage} />
                <Typography
                  color={palette?.blue?.main}
                  fontWeight={500}
                >{`${user?.firstName} ${user?.lastName} sent approval request `}</Typography>
              </Box>
            </Box>
            <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
              {announcement?.announcementTime}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardLayout>
  );
};
