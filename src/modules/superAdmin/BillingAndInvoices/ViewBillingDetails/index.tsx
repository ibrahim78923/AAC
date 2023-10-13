import { Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

const ViewBillingDetails = ({
  isOpenDrawer,

  onClose,
}: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Assign Plan'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
    >
      <Grid container>
        <Grid item sm={12}>
          <Typography variant="h5" mt={1}>
            Committed terms
          </Typography>
          <Typography variant="body1" mt={3}>
            12 Month subscription term | Feb 4,2023 to Feb 3,2024
          </Typography>
        </Grid>
        <Grid item sm={6} mt={3}>
          <Typography variant="subtitle2">
            Sales Growth plan (Include 2 users)
          </Typography>
        </Grid>
        <Grid item sm={6} mt={3} sx={{ textAlign: 'end' }}>
          <Typography variant="subtitle2">£ 400.00</Typography>
        </Grid>
        <Grid item sm={6} mt={3}>
          <Typography variant="body1">Feb 2,2023</Typography>
        </Grid>
        <Grid item sm={6} mt={3} sx={{ textAlign: 'end' }}>
          <Typography variant="body1">After £400.00 custom </Typography>
        </Grid>
      </Grid>
    </CommonDrawer>
  );
};
export default ViewBillingDetails;
