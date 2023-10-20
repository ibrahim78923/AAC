import { Grid } from '@mui/material';

import UserInfo from './UserInfo';

const GenerateInvoice = () => {
  return (
    <Grid container mt={4}>
      <Grid item lg={12}>
        <UserInfo />
      </Grid>
    </Grid>
  );
};
export default GenerateInvoice;
