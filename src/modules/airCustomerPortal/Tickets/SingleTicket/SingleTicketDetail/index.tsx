import HTMLRenderer from '@/components/HTMLRenderer';
import { Box, Typography } from '@mui/material';

export const SingleTicketDetail = ({
  status,
  singleTicketDetailContent,
}: any) => {
  return (
    <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }}>
      <Box
        width={{ xs: '100%', sm: '70%' }}
        height={'20rem'}
        overflow={'scroll'}
      >
        <HTMLRenderer content={singleTicketDetailContent} />
      </Box>

      <Box
        gap={1}
        display={'flex'}
        flexDirection={'column'}
        width={{ xs: '100%', sm: '30%' }}
        padding={2}
      >
        <Typography variant="h4">AGENT WORKING ON</Typography>
        <Typography variant="h6" color="error.main">
          No Agent
        </Typography>

        <Typography variant="h4" mt={2}>
          Status
        </Typography>
        <Typography
          variant="body1"
          borderRadius={3}
          bgcolor="primary.main"
          maxWidth={'7rem'}
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {status ? 'Closed' : 'Processing'}
        </Typography>
      </Box>
    </Box>
  );
};
