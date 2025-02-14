import { VIEW_TYPES } from '@/constants/strings';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Header } from './Header';
import { TicketsListHeader } from './TicketsLists/TicketsListHeader';
import { useServicesTickets } from './useServicesTickets';

import dynamic from 'next/dynamic';

const TableBoardView = dynamic(
  () => import('./TicketsLists/TicketsBoardView'),
  { ssr: false },
);

const TicketsTableView = dynamic(
  () => import('./TicketsLists/TicketsTableView'),
  { ssr: false },
);

const ServicesTickets = () => {
  const { viewType } = useServicesTickets();

  return (
    <>
      <Header />
      <TicketsListHeader />
      <br />
      <PermissionsGuard
        permissions={[
          viewType === VIEW_TYPES?.BOARD
            ? AIR_SERVICES_TICKETS_TICKET_LISTS?.BOARD_VIEW
            : AIR_SERVICES_TICKETS_TICKET_LISTS?.TICKETS_LIST_VIEW,
        ]}
      >
        {viewType === VIEW_TYPES?.BOARD ? (
          <TableBoardView />
        ) : (
          <TicketsTableView />
        )}
      </PermissionsGuard>
    </>
  );
};
export default ServicesTickets;
