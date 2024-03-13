import { Typography } from '@mui/material';
import { AssignedTickets } from './AssignedTickets';
import { RequestedTickets } from './RequestedTickets';

export const Tickets = () => {
  return (
    <>
      <Typography my={3} variant="h3" color="slateBlue.main">
        Assigned
      </Typography>
      <AssignedTickets />
      <Typography my={3} variant="h3" color="slateBlue.main">
        Requested
      </Typography>
      <RequestedTickets />
    </>
  );
};
