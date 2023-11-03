import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './TicketDashboardCards.styles';

export const TicketDashboardCards = ({ icon, count, label }: any) => {
  const theme = useTheme();
  return (
    <Box sx={styles?.boxMain(theme)}>
      <Box sx={{ marginLeft: 3 }}>
        <Avatar
          alt=""
          src={icon?.src}
          sx={{ width: '3.642rem', height: '3.625rem' }}
        />
      </Box>
      <Box>
        <Typography variant="h3">{count}</Typography>
        <Typography variant="body1">{label}</Typography>
      </Box>
    </Box>
  );
};
