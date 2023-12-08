import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export const TicketDashboardCards = ({ icon, count, label }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={1.5}
        flexWrap={'wrap'}
        borderRadius={2}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
        p={1.5}
      >
        <Box>
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
    </>
  );
};
