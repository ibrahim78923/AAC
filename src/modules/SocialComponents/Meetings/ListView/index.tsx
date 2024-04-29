import { Grid } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { useListView } from './useListView';

export const ListView = () => {
  const { meetings } = useListView();
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
