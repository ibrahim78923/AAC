import { Grid, Box, useTheme } from '@mui/material';
import TicketInfoBoardHeader from './TicketInfoBoardHeader';
import { TicketInfoCard } from './TicketInfoCard';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ticketViewBoardArray } from './TicketsBoardView.data';

export const TableBoardView = () => {
  const theme: any = useTheme();

  const HEAD_STATUS = ['Open', 'Resolved', 'Pending', 'Closed'];

  return (
    <Grid container spacing={2} overflow={'auto'} flexWrap={'nowrap'}>
      {HEAD_STATUS?.map((heading: any) => (
        <Grid item xs={3} sx={{ minWidth: '400px' }} key={uuidv4()}>
          <TicketInfoBoardHeader title={heading} total={2} />
          <Box
            height={'100%'}
            overflow={'auto'}
            bgcolor={theme.palette.grey[400]}
            p={2}
          >
            {ticketViewBoardArray?.map(
              (item: any) =>
                heading === item?.status && (
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
