import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSingleTicketHeader } from './useSingleTicketHeader';
import { LoadingButton } from '@mui/lab';

export const SingleTicketHeader = (props: any) => {
  const { ticketNumber } = props;
  const { isLoading, handleStatsChange, handleBack } =
    useSingleTicketHeader(props);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      alignItems={'center'}
    >
      <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
        <ArrowBack
          onClick={handleBack}
          color="action"
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h6" color="primary">
          Tickets
        </Typography>
        <Typography variant="h6" color="slateBlue.main">
          {'>'} &ensp; {ticketNumber}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
        flexWrap={'wrap'}
      >
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
