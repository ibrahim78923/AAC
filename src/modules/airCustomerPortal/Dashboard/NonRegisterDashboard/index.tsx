import { Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNonRegisterDashboard } from './useNonRegisterDashboard';

const NonRegisterDashboard = () => {
  const { dashboardWidgets } = useNonRegisterDashboard();
  return (
    <Grid container rowSpacing={1.6} columnSpacing={2.4}>
      {dashboardWidgets?.map((element: any) => (
        <Grid key={uuidv4()} item xs={12} {...element?.componentProps}>
          <Typography variant="h5">{element?.title}</Typography>
          <element.component
            articlesData={element?.articlesData}
            handleViewMore={element?.handleViewMore}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NonRegisterDashboard;
