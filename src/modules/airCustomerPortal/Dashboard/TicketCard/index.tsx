import { Avatar, Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { FirstAidKitIcon } from '@/assets/icons';
import { TicketCardI } from './TicketCard.interface';
import { styles } from './TicketCard.style';
import { ticketLabels } from './TicketCard.data';

export const TicketCard: FC<TicketCardI> = (props) => {
  const {
    ticketsProgress,
    ticketsType,
    ticketsCount,
    totalTickets,
    doneTickets,
  } = props;

  const { palette }: any = useTheme();
  const { mainWrapper, contentWrapper, ticketColors, progressBar }: any =
    styles;

  const ticketTypeColor = ticketColors?.(palette)?.[ticketsType];

  return (
    <Box sx={mainWrapper}>
      <Box sx={contentWrapper}>
        <Avatar sx={{ width: 36, height: 36, background: ticketTypeColor }}>
          <FirstAidKitIcon />
        </Avatar>
        <Box>
          <Typography variant="h3" fontWeight={700} color="blue?.main">
            {ticketsCount}
          </Typography>
          <Typography fontSize={'0.75rem'} color="blue?.light">
            {ticketLabels?.[ticketsType]}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        value={ticketsProgress}
        variant="determinate"
        sx={progressBar(palette, ticketTypeColor)}
      />
      <Typography variant="body2" pt={1} color="blue?.main">
        Tickets Done: {`${doneTickets}/${totalTickets}`}
      </Typography>
    </Box>
  );
};
