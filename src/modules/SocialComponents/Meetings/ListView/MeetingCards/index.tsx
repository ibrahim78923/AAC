import { Box, Grid, Typography } from '@mui/material';
import { useListView } from '../useListView';

export const MeetingCards = ({
  meetingHeading,
  meetingCount,
  color,
  setCardValue,
}: any) => {
  const { isAll, isUpcoming, isCompleted } = useListView();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderLeft={`0.5rem solid ${color}`}
        boxShadow={2}
        padding={1.5}
        borderRadius={2}
        marginBottom={2}
        onClick={() => setCardValue(meetingHeading)}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            border: `0.5rem solid ${color}`,
            borderColor: color,
            borderRight: `0.1rem solid ${color}`,
          },
          ...(isAll && {
            '&:hover': {
              borderRight: `0.1rem solid ${color}`,
              borderTop: `0.1rem solid ${color}`,
              borderBottom: `0.1rem solid ${color}`,
            },
          }),
          ...(isUpcoming && {
            '&:hover': {
              borderRight: `0.1rem solid ${color}`,
              borderTop: `0.1rem solid ${color}`,
              borderBottom: `0.1rem solid ${color}`,
            },
          }),
          ...(isCompleted && {
            '&:hover': {
              borderRight: `0.1rem solid ${color}`,
              borderTop: `0.1rem solid ${color}`,
              borderBottom: `0.1rem solid ${color}`,
            },
          }),
        }}
      >
        <Typography color={'secondary'}>{meetingHeading}</Typography>
        <Typography variant="h4">{meetingCount}</Typography>
      </Box>
    </Grid>
  );
};
