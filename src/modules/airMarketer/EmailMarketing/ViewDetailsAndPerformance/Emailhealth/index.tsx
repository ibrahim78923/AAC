import { Grid, LinearProgress, Typography } from '@mui/material';

const Emailhealth = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h6" sx={{ fontWeight: '700' }}>
          Email health
        </Typography>
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body2">Number of block email</Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{ height: '12px' }}
        />
      </Grid>
    </Grid>
  );
};
export default Emailhealth;
