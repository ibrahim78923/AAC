import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useHeader } from './useHeader';
import { relatedTicketActionComponent } from './Header.data';
import { TotalCount } from '../TotalCount';

export const Header = () => {
  const {
    openCreateChildTicket,
    relatedTicketsActionDropdown,
    selectedRelatedTicketLists,
    isPortalOpen,
  } = useHeader();

  return (
    <>
      <PageTitledHeader
        title={<TotalCount />}
        addTitle="Add Child Ticket"
        createPermissionKey={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CHILD_TICKET,
        ]}
        handleAction={openCreateChildTicket}
      >
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CHILD_TICKET_ACTION
          }
        >
          <SingleDropdownButton
            disabled={!!!selectedRelatedTicketLists?.length}
            dropdownOptions={relatedTicketsActionDropdown}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      {isPortalOpen?.isOpen &&
        relatedTicketActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
