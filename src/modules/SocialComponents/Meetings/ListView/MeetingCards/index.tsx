import { Box, Grid, Typography } from '@mui/material';
import { MeetingCardsPropsI } from './MeetingCard.interface';

export const MeetingCards = ({
  meetingHeading,
  meetingCount,
  color,
  isActive,
  meetingType,
  router,
}: MeetingCardsPropsI) => {
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
        onClick={() => {
          router?.push({
            ...router?.basePath,
            query: {
              type: meetingType,
            },
          });
        }}
        sx={{
          cursor: 'pointer',
          boxShadow: isActive ? `0px 0px 1px 1px ${color}` : 2,
          '&:hover': {
            boxShadow: `0px 0px 1px 1px ${color}`,
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        tabIndex={0}
      >
        <Typography color={'secondary'}>{meetingHeading}</Typography>
        <Typography variant="h4">{meetingCount}</Typography>
      </Box>
    </Grid>
  );
};
