import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useHeader } from './useHeader';
import { ticketTasksActionComponent } from './Header.data';

export const Header = () => {
  const {
    selectedTicketTasksLists,
    actionsDropdownForTicketTasksLists,
    openCreateNewTicketTasksPortal,
    isPortalOpen,
  } = useHeader();

  return (
    <>
      <PageTitledHeader
        title={'Task'}
        addTitle="Add New Task"
        createPermissionKey={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_TASK]}
        handleAction={openCreateNewTicketTasksPortal}
        hasExport
        exportPermissionKey={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EXPORT_TASK,
        ]}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_TASK,
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_TASK,
          ]}
        >
          <SingleDropdownButton
            dropdownOptions={actionsDropdownForTicketTasksLists}
            disabled={!!!selectedTicketTasksLists?.length}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      {isPortalOpen?.isOpen &&
        ticketTasksActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
