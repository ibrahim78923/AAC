import { AssignedTickets } from './AssignedTickets';
import { RequestedTickets } from './RequestedTickets';

export const Tickets = () => {
  return (
    <>
      <AssignedTickets />
      <br />
      <RequestedTickets />
    </>
  );
};
