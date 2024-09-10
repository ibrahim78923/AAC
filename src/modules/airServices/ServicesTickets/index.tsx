import { VIEW_TYPES } from '@/constants/strings';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Header } from './Header';
import { TicketsListHeader } from './TicketsLists/TicketsListHeader';
import { TableBoardView } from './TicketsLists/TicketsBoardView';
import { TicketsTableView } from './TicketsLists/TicketsTableView';
import { useServicesTickets } from './useServicesTickets';

const ServicesTickets = () => {
  const { router } = useServicesTickets();

  return (
    <>
      <Header />
      <TicketsListHeader />
      <br />
      {router?.query?.viewType === VIEW_TYPES?.BOARD ? (
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.BOARD_VIEW]}
        >
          <TableBoardView />
        </PermissionsGuard>
      ) : (
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.TICKETS_LIST_VIEW]}
        >
          <TicketsTableView />
        </PermissionsGuard>
      )}
    </>
  );
};
export default ServicesTickets;
