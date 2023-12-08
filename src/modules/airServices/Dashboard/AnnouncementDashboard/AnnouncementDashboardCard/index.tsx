import { Box, Divider, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './AnnouncementDashboardCard.styles';

export const AnnouncementDashboardCard = ({
  icon,
  announcement,
  announcementAvatar,
  announcementTime,
  isBorderBottom,
}: any) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={styles?.boxMain(theme, isBorderBottom)}>
        <Box marginTop={1}>
          <Typography variant="body3" color={'slateBlue.main'} fontWeight={600}>
            {announcement}
          </Typography>
          <Typography>
            <Typography variant="body3" color={'custom.main'}>
              {announcementTime}
            </Typography>
          </Typography>
        </Box>
        <Box
          display={'flex'}
          gap={1}
          justifyContent={'center'}
          flexWrap={'wrap'}
        >
          <Avatar
            alt=""
            src={icon?.src}
            sx={{
              width: '1.125rem',
              height: '1.125rem',
            }}
          />
          <Typography variant="body3" color={'custom.main'}>
            {announcementAvatar}
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
