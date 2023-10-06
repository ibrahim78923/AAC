import { Grid } from '@mui/material';
import AddRequestPage from './AddRequestPage';
import RequestApprovalPage from './RequestApprovalPage';
import { ApprovalData } from './RequestApprovalPage/AllApprovals.mock';

export const Approvals = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            'MuiPaper-root-MuiCard-root': {
              pl: { sm: '20px', xs: '0' },
              border: '1px solid',
            },
          }}
        >
          {ApprovalData?.length ? <RequestApprovalPage /> : <AddRequestPage />}
        </Grid>
      </Grid>
    </>
  );
};
