import { Box, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSingleTicketHeader } from './useSingleTicketHeader';
import { LoadingButton } from '@mui/lab';

export const SingleTicketHeader = (props: any) => {
  const { setOpenPopup, ticketNumber } = props;
  const { isLoading, handleStatsChange, handleBack } =
    useSingleTicketHeader(props);

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
        <ArrowBack
          onClick={handleBack}
          color="action"
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h6" color="primary">
          Tickets
        </Typography>
        <Typography variant="h6">
          {'>'}&ensp;{ticketNumber}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
        margin={{ xs: 1, sm: 1 }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpenPopup(true)}
        >
          Share
        </Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={handleStatsChange}
        >
          Mark ticket as closed
        </LoadingButton>
      </Box>
    </Box>
  );
};
