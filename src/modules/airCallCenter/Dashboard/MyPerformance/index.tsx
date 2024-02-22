import { Typography } from '@mui/material';
import InComingCallCard from './InComingCallCard';
import { inComingCallCardArr, outGoingCallCardArr } from './MyPerformance.data';

export const MyPerformance = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginLeft: '10px' }}>
        Incoming Calls
      </Typography>
      <InComingCallCard CallCardArr={inComingCallCardArr} />

      <Typography variant="h4" sx={{ marginTop: '20px', marginLeft: '10px' }}>
        Outgoing Calls
      </Typography>
      <InComingCallCard CallCardArr={outGoingCallCardArr} />
    </>
  );
};
