import { Box, Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './TicketDashboardCards.styles';

export const TicketDashboardCards = ({ icon, count, label }: any) => {
  return (
    <Card sx={styles?.CardMain}>
      <Box sx={{ marginLeft: 3 }}>
        <Avatar
          alt=""
          src={icon?.src}
          sx={{ width: '58.264px', height: '58px' }}
        />
      </Box>
      <Box>
        <Typography variant="h3">{count}</Typography>
        <Typography variant="body1">{label}</Typography>
      </Box>
    </Card>
  );
};
