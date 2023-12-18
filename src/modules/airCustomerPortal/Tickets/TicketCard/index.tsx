import { Box, Typography, useTheme } from '@mui/material';
import { useTickets } from '../useTickets';
import Chip from '@mui/material/Chip';

export const TicketsCard = (props: any) => {
  const { id, heading, subHeading, created, status, icon } = props;
  const { handleSingleTickets } = useTickets();
  const theme = useTheme();
  return (
    <Box
      gap={2}
      borderRadius={3}
      p={1.6}
      display={'flex'}
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent={{
        xs: 'center',
        sm: 'space-between',
        lg: 'space-between',
      }}
      alignItems={'center'}
      width={'100%'}
      height={'auto'}
      bgcolor={theme?.palette?.grey?.[100]}
      sx={{ cursor: 'pointer' }}
      onClick={() => handleSingleTickets(id)}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={0.6}
      >
        <Typography variant="h5">{heading}</Typography>
        <Typography
          width={'100%'}
          gap={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          variant="body1"
        >
          {icon}
          {subHeading}
        </Typography>

        <Box
          display={'flex'}
          alignItems={'center'}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Typography variant="body2">Created On {created} - </Typography>
          <Typography variant="body2" color="primary">
            Via Portal
          </Typography>
        </Box>
      </Box>
      <Chip label={status} />
    </Box>
  );
};
