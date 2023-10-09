import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import RequestApproval from './RequestApproval';
import RequestRecievedApproval from './RequestRecievedApproval';
import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddRequestApprovalDrawer from '../AddRequestApprovalDrawer';
import { useState } from 'react';
import { AllApprovals } from './AllApprovals';

const TabsData = ['All', 'Request Approval', 'Request recieved for approval'];

const RequestApprovalPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '20px',
        }}
      >
        <Typography variant="h5">Approvals</Typography>
        <Button
          variant="contained"
          onClick={() => setIsDrawerOpen(true)}
          startIcon={<AddCircleIcon />}
        >
          Request Approval
        </Button>
      </Grid>
      <HorizontalTabs tabsDataArray={TabsData} variant={'fullWidth'}>
        <AllApprovals />
        <RequestApproval />
        <RequestRecievedApproval />
      </HorizontalTabs>
      <AddRequestApprovalDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default RequestApprovalPage;
