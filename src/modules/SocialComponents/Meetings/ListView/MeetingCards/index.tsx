import { Box, Grid, Typography } from '@mui/material';

export const MeetingCards = ({
  meetingHeading,
  meetingCount,
  color,
  setCardValue,
}: any) => {
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
        sx={{ cursor: 'pointer' }}
      >
        <Typography color={'secondary'}>{meetingHeading}</Typography>
        <Typography variant="h4">{meetingCount}</Typography>
      </Box>
    </Grid>
  );
};
