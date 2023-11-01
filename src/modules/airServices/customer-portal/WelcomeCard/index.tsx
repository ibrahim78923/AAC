import React from 'react';
import { Box, Typography } from '@mui/material';
import { TicketCard } from './TicketCard';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './WelcomeCard.style';

export const WelcomeCard = () => {
  const { mainWrapper, ticketCardWrapper } = styles;
  return (
    <>
      <Box sx={mainWrapper}>
        <Box flexBasis={{ xs: '100%', xl: '50%' }}>
          <Typography variant="h4" fontWeight={700} color={'white'}>
            Welcome to AirApple Cart - Services
          </Typography>
          <Typography variant="body2" color={'white'}>
            We are here to help you, Please let us know what you need.
          </Typography>
        </Box>
        <Box sx={ticketCardWrapper}>
          {['newTickets', 'pendingTickets', 'completedTickets']?.map(
            (ticket) => (
              <TicketCard
                key={uuidv4()}
                ticketsProgress={50}
                ticketsType={ticket}
                ticketsCount={12}
                totalTickets={5}
                doneTickets={4}
              />
            ),
          )}
        </Box>
      </Box>
    </>
  );
};
