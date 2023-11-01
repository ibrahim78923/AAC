import { TicketsCard } from './TicketsCard';
import { TicketsDataArray } from './Tickets.data';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const Tickets = () => {
  return (
    <Grid container gap={2} justifyContent={'center'} overflow="scroll">
      {TicketsDataArray.map((option: any) => (
        <TicketsCard
          key={uuidv4()}
          heading={option.heading}
          subHeading={option.subHeading}
          created={option.created}
          status={option.status}
        />
      ))}
    </Grid>
  );
};
