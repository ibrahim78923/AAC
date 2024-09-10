import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { VIEW_TYPES } from '@/constants/strings';

export const Header = () => {
  const {
    router,
    openCreateTicketPortal,
    exportTicketsAsCsv,
    exportTicketsAsXls,
  } = useHeader();

  return (
    <PageTitledHeader
      title={
        router?.query?.viewType === VIEW_TYPES?.BOARD
          ? 'Tickets Board'
          : 'Ticket List - All Tickets'
      }
      addTitle={'Create Ticket'}
      hasExport
      handleExcelExport={exportTicketsAsXls}
      handleCsvExport={exportTicketsAsCsv}
      handleAction={openCreateTicketPortal}
      exportPermissionKey={[AIR_SERVICES_TICKETS_TICKET_LISTS?.EXPORT_TICKETS]}
      createPermissionKey={[AIR_SERVICES_TICKETS_TICKET_LISTS?.CREATE_TICKET]}
    />
  );
};
