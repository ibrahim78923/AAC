import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './TicketDashboardCards.styles';
import { ticketDashboardCardsData } from './TicketDashboardCards.data';
import { v4 as uuidv4 } from 'uuid';

export const TicketDashboardCards = () => {
  const theme = useTheme();
  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={1}>
      {ticketDashboardCardsData?.map((item) => (
        <Box key={uuidv4()} flex={1}>
          <Box sx={styles?.boxMain(theme)}>
            <Box marginLeft={3}>
              <Avatar
                alt=""
                src={item?.icon?.src}
                sx={{ width: '3.642rem', height: '3.625rem' }}
              />
            </Box>
            <Box>
              <Typography variant="h3">{item?.count}</Typography>
              <Typography variant="body1">{item?.label}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
