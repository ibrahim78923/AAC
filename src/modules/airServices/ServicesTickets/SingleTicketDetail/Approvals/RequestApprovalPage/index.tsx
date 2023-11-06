import { useState } from 'react';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import RequestApproval from './RequestApproval';
import RequestReceivedApproval from './RequestReceivedApproval';
import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AllApprovals } from './AllApprovals';
import AddRequestApproval from '../AddRequestPage/AddRequestApproval';

const TabsData = ['All', 'Request Approval', 'Request received for approval'];

const RequestApprovalPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={'1rem'}
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
        <RequestReceivedApproval />
      </HorizontalTabs>
      <AddRequestApproval
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default RequestApprovalPage;
