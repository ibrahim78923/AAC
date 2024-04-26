import { Grid, LinearProgress, Typography } from '@mui/material';

const EmailReadability = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h6" sx={{ fontWeight: '700' }}>
          Email Readability
        </Typography>
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Read</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Skimmed</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Glanced</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
    </Grid>
  );
};
export default EmailReadability;
