import { Grid, Skeleton } from '@mui/material';
import { ticketDashboardCardsData } from './TicketCards.data';
import { TicketDashboardCards } from '../../TicketDashboardCards';
import { useTicketCards } from './useTicketCards';

export const TicketCards = () => {
  const { cardData, isLoading, isFetching } = useTicketCards();
  return (
    <>
      {isLoading || isFetching ? (
        <Skeleton />
      ) : (
        <Grid container spacing={3}>
          {ticketDashboardCardsData(cardData)?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item?._id}>
              <TicketDashboardCards
                icon={item?.icon}
                count={item?.count}
                label={item?.label}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
