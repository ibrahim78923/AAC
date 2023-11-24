import { Box, Button, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './Announcements.styles';
import { announcementDashboardCardData } from './Announcements.data';
import { v4 as uuidv4 } from 'uuid';
import { ViewDetailSharedIcon } from '@/assets/icons';
import { CardWrapper } from '../CardWrapper';
import { DashboardAvatarImage } from '@/assets/images';

export const Announcements = () => {
  const theme = useTheme();
  return (
    <CardWrapper>
      <Box marginLeft={2}>
        <Box display={'flex'} justifyContent={'space-between'} marginRight={3}>
          <Typography variant="h4">Announcements</Typography>
          <Box>
            <Button
              variant="text"
              startIcon={<ViewDetailSharedIcon />}
            ></Button>
          </Box>
        </Box>
      </Box>
      <Box>
        {announcementDashboardCardData?.map((item, index) => (
          <Box key={uuidv4()}>
            <Box
              sx={styles?.boxMain(
                announcementDashboardCardData?.length - 1 !== index,
                theme,
              )}
            >
              <Box marginTop={1}>
                <Typography sx={styles?.announcementText}>
                  We are excited to announce that..
                </Typography>
                <Typography sx={styles?.announcementTextOne}>
                  {item?.timeFrame}
                </Typography>
              </Box>
              <Box display={'flex'} justifyContent={'center'}>
                <Avatar
                  alt=""
                  src={DashboardAvatarImage?.src}
                  sx={{
                    width: '1.125rem',
                    height: '1.125rem',
                    marginRight: '0.625rem',
                  }}
                />
                <Typography sx={styles?.announcementTextTwo}>
                  {item?.userName}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Button variant="text">View All</Button>
      </Box>
    </CardWrapper>
  );
};
