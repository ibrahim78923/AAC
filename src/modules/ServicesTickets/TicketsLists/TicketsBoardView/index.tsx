import { Grid, Box, useTheme } from '@mui/material';
import TicketInfoBoardHeader from './TicketInfoBoardHeader';
import { ticketViewBoardArray } from '@/mock/modules/ServicesTickets/TicketsLists/TicketsBoardView';
import { TicketInfoCard } from './TicketInfoCard';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TableBoardView = () => {
  const theme: any = useTheme();

  return (
    <Grid container spacing={2} overflow={'auto'} flexWrap={'nowrap'}>
      {['Open', 'Resolved', 'Pending', 'Closed'].map((heading) => (
        <Grid item xs={3} sx={{ minWidth: '400px' }} key={heading}>
          <TicketInfoBoardHeader title={heading} total={2} />
          <Box
            height={'100%'}
            overflow={'auto'}
            bgcolor={theme.palette.grey[400]}
            p={2}
          >
            {ticketViewBoardArray.map(
              (item) =>
                heading === item.status && (
                  <Fragment key={uuidv4()}>
                    <TicketInfoCard details={item} />
                  </Fragment>
                ),
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
