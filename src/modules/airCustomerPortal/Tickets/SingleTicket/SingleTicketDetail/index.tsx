import { AIR_CUSTOMER_PORTAL_TICKET } from '@/constants/strings';
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
        dangerouslySetInnerHTML={{ __html: singleTicketDetailContent }}
      />
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
          {status
            ? AIR_CUSTOMER_PORTAL_TICKET?.CLOSED
            : AIR_CUSTOMER_PORTAL_TICKET?.PROCESSING}
        </Typography>
      </Box>
    </Box>
  );
};
