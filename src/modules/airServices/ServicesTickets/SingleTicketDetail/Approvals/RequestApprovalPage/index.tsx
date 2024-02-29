import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import RequestApproval from './RequestApproval';
import RequestReceivedApproval from './RequestReceivedApproval';
import { AllApprovals } from './AllApprovals';
import { PageTitledHeader } from '@/components/PageTitledHeader';

const RequestApprovalPage = (props: any) => {
  const {
    setIsDrawerOpen,
    data,
    setApproval,
    updateRequestApprovalStatus,
    metaData,
  } = props;
  return (
    <>
      <PageTitledHeader
        title={'Approvals'}
        addTitle={' Request Approval'}
        handleAction={() => setIsDrawerOpen(true)}
      />
      <HorizontalTabs
        tabsDataArray={[
          'All',
          'Request sent for approval',
          'Request received for approval',
        ]}
      >
        <AllApprovals
          data={data}
          setApproval={(x: any) => setApproval?.(x)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
          metaData={metaData}
        />
        <RequestApproval
          setApproval={(x: any) => setApproval?.(x)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
        />
        <RequestReceivedApproval
          setApproval={(x: any) => setApproval?.(x)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
        />
      </HorizontalTabs>
    </>
  );
};

export default RequestApprovalPage;
