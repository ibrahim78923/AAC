import { Grid, Typography } from '@mui/material';
import CreateForm from './CreateForm';
import { useRouter } from 'next/router';
import { DRAWER_TYPES } from '@/constants/strings';

const CreateSalesDashboard = () => {
  const router = useRouter();
  const dashboardType = router?.query?.type;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Typography variant="h3">
            {dashboardType === DRAWER_TYPES?.EDIT
              ? 'Edit Dashboard'
              : dashboardType === DRAWER_TYPES?.VIEW
                ? 'View Dashboard'
                : 'Create Dashboard'}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <CreateForm formType={dashboardType} />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateSalesDashboard;
