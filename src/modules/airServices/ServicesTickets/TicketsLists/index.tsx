import { useTicketsLists } from './useTicketsLists';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';
import { VIEW_TYPES } from '@/constants/strings';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { TicketsListHeader } from './TicketsListHeader';
import { Header } from '../Header';

export const TicketsLists = () => {
  const { router } = useTicketsLists();

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
