import { Avatar, Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { FirstAidKitIcon } from '@/assets/icons';
import { TicketCardI } from './TicketCard.interface';

export const TicketCard: FC<TicketCardI> = (props) => {
  const {
    ticketsProgress,
    ticketsType,
    ticketsCount,
    totalTickets,
    doneTickets,
  } = props;
  const { palette }: any = useTheme();

  const ticketColors: any = {
    newTickets: palette?.primary?.main,
    pendingTickets: palette?.warning?.main,
    completedTickets: palette?.success?.main,
  };

  const ticketLabels: any = {
    newTickets: 'New Tickets',
    pendingTickets: 'Pending Tickets',
    completedTickets: 'Completed Tickets',
  };

  const ticketTypeColor = ticketColors?.[ticketsType];

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: palette?.grey?.[0],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: ticketTypeColor,
    },
  }));

  return (
    <Box
      sx={{
        p: 1.2,
        borderRadius: '0.5rem',
        background: 'white',
        flex: 1,
        minWidth: 180,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 0.6,
          pb: 1.2,
        }}
      >
        <Avatar sx={{ width: 36, height: 36, background: ticketTypeColor }}>
          <FirstAidKitIcon />
        </Avatar>
        <Box>
          <Typography variant="h3" fontWeight={700} color="blue.main">
            {ticketsCount}
          </Typography>
          <Typography fontSize={'0.75rem'} color="blue.light">
            {ticketLabels?.[ticketsType]}
          </Typography>
        </Box>
      </Box>
      <BorderLinearProgress variant="determinate" value={ticketsProgress} />
      <Typography variant="body2" pt={1} color="blue.main">
        Tickets Done: {`${doneTickets}/${totalTickets}`}
      </Typography>
    </Box>
  );
};
