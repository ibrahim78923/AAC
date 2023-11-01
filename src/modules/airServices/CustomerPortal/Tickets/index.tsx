import { TicketsCard } from './TicketCard';
import { ticketsDataArray } from './Tickets.data';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const Tickets = () => {
  return (
    <Grid container gap={2} justifyContent={'center'} overflow="scroll">
      {ticketsDataArray?.map((option: any) => (
        <TicketsCard
          key={uuidv4()}
          icon={option?.icon}
          heading={option?.heading}
          subHeading={option?.subHeading}
          created={option?.created}
          status={option?.status}
        />
      ))}
    </Grid>
  );
};
