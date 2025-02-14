import { Header } from './Header';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { useApprovals } from './useApprovals';

const Approvals = () => {
  const { handleTabChange, singleTicketDetailApprovalsTabs } = useApprovals();

  return (
    <>
      <Header />
      <PermissionsTabs
        spacing={0.3}
        tabsDataArray={singleTicketDetailApprovalsTabs}
        handleTabChange={handleTabChange}
      />
    </>
  );
};

export default Approvals;
