import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import AllApprovals from '../ApprovalPage/components/AllApprovals';
import RequestApproval from '../ApprovalPage/components/RequestApproval';
import RequestRecievedApproval from '../ApprovalPage/components/RequestRecievedApproval';
const TabsData = ['All', 'Request Approval', 'Request recieved for approval'];

const ApprovalPage: React.FC = () => {
  return (
    <>
      <HorizontalTabs tabsDataArray={TabsData} variant={'fullWidth'}>
        <AllApprovals />
        <RequestApproval />
        <RequestRecievedApproval />
      </HorizontalTabs>
    </>
  );
};

export default ApprovalPage;
