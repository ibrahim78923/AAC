import { GreyPlusSharedIcon } from '@/assets/icons';
import { Card, Grid, Input, Typography } from '@mui/material';

const AddDiscount = () => {
  return (
    <Grid container>
      <Grid item xs={12} mt={4}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h4">Add Discount </Typography>
          <div style={{ marginTop: '8px', marginLeft: '8px' }}>
            <GreyPlusSharedIcon />
          </div>
        </div>
        <Typography variant="h6">Discount</Typography>
      </Grid>
      <Grid item xs={12} mt={1}>
        <div className="MuiInput-root">
          <Input className="MuiInput-input" sx={{ my: 1 }} />
        </div>
      </Grid>
      <Card sx={{ width: '100%', marginTop: '20px' }}>
        <Grid container style={{ padding: '24px' }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              3 Additional Users (£ 15/user)
            </Typography>
            <Typography variant="body1">
              4GB Additional Storage (£ 15/1GB)
            </Typography>
            <Typography variant="body1">Sub Total</Typography>
            <Typography variant="body1">Discount(10%)</Typography>
            <Typography variant="body1">Tax (Vat 20%)</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">£45</Typography>
            <Typography variant="subtitle2">£60</Typography>
            <Typography variant="subtitle2">£145</Typography>
            <Typography variant="subtitle2">-£10</Typography>
            <Typography variant="subtitle2">£60</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
export default AddDiscount;
