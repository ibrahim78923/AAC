import { VIEW_TYPES } from '@/constants/strings';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Header } from './Header';
import { TicketsListHeader } from './TicketsLists/TicketsListHeader';
import { useServicesTickets } from './useServicesTickets';

import dynamic from 'next/dynamic';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const TableBoardView = dynamic(
  () => import('./TicketsLists/TicketsBoardView'),
  {
    ssr: false,
    loading: (options: any) => (
      <LazyLoadingFlow
        name="list view"
        isLoading={options?.isLoading}
        error={options?.error}
      />
    ),
  },
);

const TicketsTableView = dynamic(
  () => import('./TicketsLists/TicketsTableView'),
  {
    ssr: false,
    loading: (options: any) => (
      <LazyLoadingFlow
        name="board view"
        isLoading={options?.isLoading}
        error={options?.error}
      />
    ),
  },
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
