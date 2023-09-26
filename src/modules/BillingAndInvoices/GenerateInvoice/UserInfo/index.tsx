import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

const styles = {
  mainCardBox: (theme: Theme) => ({
    backgroundColor: theme?.blue?.main,
  }),
};
const UserInfo = () => {
  const theme = useTheme<Theme>();
  return (
    <Card sx={styles.mainCardBox(theme?.palette)}>
      <CardContent>
        <Grid container>
          <Grid item sm={6}>
            <Typography variant="h5" gutterBottom>
              Air Applecart
            </Typography>
            <Typography variant="subtitle2">123 Street Address</Typography>
            <Typography variant="subtitle2">City | State | Zip Code</Typography>
            <Typography variant="subtitle2">Phone No</Typography>
            <Typography variant="subtitle2">Company Email</Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h5" gutterBottom>
              Air Applecart
            </Typography>
            <Typography variant="subtitle2">123 Street Address</Typography>
            <Typography variant="subtitle2">City | State | Zip Code</Typography>
            <Typography variant="subtitle2">Phone No</Typography>
            <Typography variant="subtitle2">Company Email</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
export default UserInfo;
