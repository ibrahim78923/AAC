import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';
import { useTickets } from '../../useTickets';

export const SingleTicketHeader = (props: any) => {
  const { onSubmit, setOpenPopup } = props;
  const { handleTickets } = useTickets();
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={{ xs: 'wrap' }}
      alignItems={'center'}
      padding={1}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
      >
        <Box onClick={() => handleTickets()} sx={{ cursor: 'pointer' }}>
          <ArrowLeftIcon />
        </Box>
        <Typography variant="h6" color="primary">
          Tickets
        </Typography>
        <Typography variant="h6">Adobe Photoshop CC</Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
        margin={{ xs: 1, sm: 1 }}
      >
        <Button variant="outlined" onClick={() => setOpenPopup(true)}>
          Share
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Mark ticket as closed
        </Button>
      </Box>
    </Box>
  );
};
