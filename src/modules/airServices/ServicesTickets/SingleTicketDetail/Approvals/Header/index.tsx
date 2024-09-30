import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { ticketsApprovalsActionComponent } from './Header.data';

export const Header = () => {
  const { isPortalOpen, openAddRequestApprovals } = useHeader();
  return (
    <>
      <PageTitledHeader
        title={'Approvals'}
        addTitle={' Request Approval'}
        handleAction={openAddRequestApprovals}
        createPermissionKey={[
          AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS,
        ]}
      />
      {isPortalOpen?.isOpen &&
        ticketsApprovalsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
