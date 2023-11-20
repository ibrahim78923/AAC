import { Box, Divider, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './AnnouncementDashboardCard.styles';
import { useAnnouncementDashboardCard } from './useAnnouncementDashboardCard.';

export const AnnouncementDashboardCard = ({
  icon,
  announcementText,
  announcementTextAvatar,
  isBorderBottom,
}: any) => {
  const { theme, currentDate, formatDateTime } = useAnnouncementDashboardCard();

  return (
    <Box>
      <Box sx={styles?.boxMain(theme, isBorderBottom)}>
        <Box marginTop={1}>
          <Typography variant="body3" color={'grey.800'}>
            {announcementText}
          </Typography>
          <Typography>
            <Typography variant="body3" color={'grey.800'}>
              {formatDateTime(currentDate)}{' '}
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
          borderBottom: isBorderBottom
            ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
            : '',
        }}
      />
    </Box>
  );
};
