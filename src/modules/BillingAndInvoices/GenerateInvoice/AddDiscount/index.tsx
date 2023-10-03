import { Grid, Typography } from '@mui/material';

const AddDiscount = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Add Discount</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body1">3 Additional Users (£ 15/user)</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="overline">£ 45</Typography>
      </Grid>
    </Grid>
  );
};
export default AddDiscount;
