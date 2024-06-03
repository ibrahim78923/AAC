import { Box, Grid, useTheme } from '@mui/material';
import { RecentActivities } from '../../RecentActivities';
import { TicketBased } from '../../Chart/TicketBased';

const TicketsStatusAndActivities = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} sx={{ marginTop: 2 }}>
          <Box
            borderRadius={3}
            border={`1px solid ${theme?.palette?.grey?.[700]}`}
            height="100%"
          >
            <Box marginLeft={2}>
              <Box marginTop={2} marginBottom={2}>
                <TicketBased />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5} sx={{ marginTop: 2 }}>
          <Box
            borderRadius={3}
            border={`1px solid ${theme?.palette?.grey?.[700]}`}
            height="100%"
          >
            <RecentActivities />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TicketsStatusAndActivities;
