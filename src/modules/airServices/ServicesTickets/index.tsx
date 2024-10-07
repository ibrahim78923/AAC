import { VIEW_TYPES } from '@/constants/strings';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Header } from './Header';
import { TicketsListHeader } from './TicketsLists/TicketsListHeader';
import { TableBoardView } from './TicketsLists/TicketsBoardView';
import { TicketsTableView } from './TicketsLists/TicketsTableView';
import { useServicesTickets } from './useServicesTickets';

const { TICKETS_LIST_VIEW, BOARD_VIEW } =
  AIR_SERVICES_TICKETS_TICKET_LISTS ?? {};
const { BOARD } = VIEW_TYPES ?? {};

const ServicesTickets = () => {
  const { viewType } = useServicesTickets();

  return (
    <>
      <Header />
      <TicketsListHeader />
      <br />
      {viewType === BOARD ? (
        <PermissionsGuard permissions={[BOARD_VIEW]}>
          <TableBoardView />
        </PermissionsGuard>
      ) : (
        <PermissionsGuard permissions={[TICKETS_LIST_VIEW]}>
          <TicketsTableView />
        </PermissionsGuard>
      )}
    </>
  );
};
export default ServicesTickets;
