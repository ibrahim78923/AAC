import { Grid, Typography, useTheme } from '@mui/material';
import { SingleDropdownButton } from '../../../../components/SingleDropdownButton';
import { actionsFunction, dashboardFunction } from './HeaderDashboard.data';
import { styles } from './HeaderDashboard.styles';
import { useRouter } from 'next/router';

export const HeaderDashboard = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={styles?.serviceText}>Service</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item lg={10}>
            <Typography variant="h4" sx={{ marginTop: 2 }}>
              <span style={{ color: theme?.palette?.blue?.main }}>Hi Sam!</span>{' '}
              Happy to See You again
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Grid container spacing={1}>
              <Grid item>
                <SingleDropdownButton
                  dropdownOptions={actionsFunction}
                  dropdownName="Action"
                />
              </Grid>
              <Grid item>
                <SingleDropdownButton
                  dropdownOptions={dashboardFunction(theme, router)}
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
