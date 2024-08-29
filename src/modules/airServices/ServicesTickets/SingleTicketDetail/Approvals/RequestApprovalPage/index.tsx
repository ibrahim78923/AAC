import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { singleTicketDetailApprovalsTabsDynamic } from './RequestApprovalPage.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { RequestApprovalPagePropsI } from '../Approvals.interface';

const RequestApprovalPage = (props: RequestApprovalPagePropsI) => {
  const { setIsDrawerOpen } = props;
  const singleTicketDetailApprovalsTabs =
    singleTicketDetailApprovalsTabsDynamic(props);

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
      <PermissionsTabs
        spacing={0.3}
        tabsDataArray={singleTicketDetailApprovalsTabs}
      />
    </>
  );
};

export default RequestApprovalPage;
