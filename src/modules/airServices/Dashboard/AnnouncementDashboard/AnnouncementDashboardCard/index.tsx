import { Box, Divider, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './AnnouncementDashboardCard.styles';

export const AnnouncementDashboardCard = ({
  icon,
  announcementText,
  announcementTextTime,
  announcementTextAvatar,
  isborderbottom,
}: any) => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={styles?.boxMain(theme, isborderbottom)}>
        <Box marginTop={1}>
          <Typography variant="body3" color={'grey.800'}>
            {announcementText}
          </Typography>
          <Typography>
            <Typography variant="body3" color={'grey.800'}>
              {announcementTextTime}
            </Typography>
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Avatar
            alt=""
            src={icon?.src}
            sx={{
              width: '1.125rem',
              height: '1.125rem',
              marginRight: '0.625rem',
            }}
          />
          <Typography variant="body3" color={'custom?.main'}>
            {announcementTextAvatar}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          borderBottom: isborderbottom
            ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
            : '',
        }}
      />
    </Box>
  );
};
