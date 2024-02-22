import { Grid } from '@mui/material';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
  const { dashboardWidgets } = useDashboard();
  return (
    <Grid container rowSpacing={1.6} columnSpacing={2.4}>
      {dashboardWidgets?.map(
        ({ componentProps, component: Component, ...rest }: any) => (
          <Grid key={rest?._id} item xs={12} {...componentProps}>
            <Component {...rest} />
          </Grid>
        ),
      )}
    </Grid>
  );
};

export default Dashboard;
