import { Grid, useTheme } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { meetingCardsDetails } from './MeetingCards.data';

export const ListView = () => {
  const theme = useTheme();
  const meetings = meetingCardsDetails(theme);
  return (
    <Grid container spacing={2}>
      {' '}
      {meetings?.map((meeting) => (
        <MeetingCards
          key={meeting?.id}
          meetingHeading={meeting?.meetingHeading}
          meetingCount={meeting?.meetingCount}
          color={meeting?.color}
        />
      ))}
    </Grid>
  );
};
