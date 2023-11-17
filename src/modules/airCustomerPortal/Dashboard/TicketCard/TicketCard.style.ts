import { linearProgressClasses } from '@mui/material';

export const styles = {
  mainWrapper: {
    p: 1.2,
    borderRadius: '0.5rem',
    background: 'white',
    flex: 1,
    minWidth: 180,
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 0.6,
    pb: 1.2,
  },
  ticketColors: (palette: any) => ({
    newTickets: palette?.primary?.main,
    pendingTickets: palette?.warning?.main,
    completedTickets: palette?.success?.main,
  }),
  progressBar: (palette: any, ticketTypeColor: string) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: palette?.grey?.[0],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: ticketTypeColor,
    },
  }),
};
