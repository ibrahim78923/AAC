import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
  const { dashboardWidgets } = useDashboard();
  return (
    <Grid container rowSpacing={1.6} columnSpacing={2.4}>
      {dashboardWidgets?.map(
        ({ componentProps, component: Component, ...rest }: any) => (
          <Grid key={uuidv4()} item xs={12} {...componentProps}>
            <Component {...rest} />
          </Grid>
        ),
      )}
    </Grid>
  );
};

export default Dashboard;
