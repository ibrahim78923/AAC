import { Grid, Typography } from '@mui/material';
import { SingleDropdownButton } from '../../../../components/SingleDropdownButton';
import { ActionsFunction, DashboardFunction } from './HeaderDashboard.data';
import { styles } from './HeaderDashboard.styles';

export const HeaderDashboard = ({}: any) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={styles?.serviceText}>Service</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item lg={10}>
            <Typography variant="h4" sx={{ marginTop: 2 }}>
              <span style={{ color: '#1F305D' }}>Hi Sam!</span> Happy to See You
              again
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Grid container spacing={1}>
              <Grid item>
                <SingleDropdownButton
                  dropdownOptions={ActionsFunction}
                  dropdownName="Action"
                />
              </Grid>
              <Grid item>
                <SingleDropdownButton
                  dropdownOptions={DashboardFunction}
                  dropdownName="Dashboards"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
