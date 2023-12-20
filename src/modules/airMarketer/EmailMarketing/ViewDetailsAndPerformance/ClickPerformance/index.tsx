import { Grid, LinearProgress, Typography } from '@mui/material';

const ClickPerformance = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h6" sx={{ fontWeight: '700' }}>
          Click Performance
        </Typography>
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Open rate</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Number of links clicked</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Click rate</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Click -through rate</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
    </Grid>
  );
};
export default ClickPerformance;
