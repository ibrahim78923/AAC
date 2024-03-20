import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import RequestApproval from './RequestApproval';
import RequestReceivedApproval from './RequestReceivedApproval';
import { AllApprovals } from './AllApprovals';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';

const RequestApprovalPage = (props: any) => {
  const { setIsDrawerOpen, setApproval, updateRequestApprovalStatus } = props;
  return (
    <>
      <PageTitledHeader
        title={'Approvals'}
        addTitle={' Request Approval'}
        handleAction={() => setIsDrawerOpen(true)}
        createPermissionKey={[
          AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS,
        ]}
      />
      <HorizontalTabs
        tabsDataArray={[
          'All',
          'Request sent for approval',
          'Request received for approval',
        ]}
      >
        <AllApprovals
          setApproval={(item: any) => setApproval?.(item)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
        />
        <RequestApproval
          setApproval={(item: any) => setApproval?.(item)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
        />
        <RequestReceivedApproval
          setApproval={(item: any) => setApproval?.(item)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
        />
      </HorizontalTabs>
    </>
  );
};

export default RequestApprovalPage;
