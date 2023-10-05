import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { useTicketsLists } from '../useTicketsLists';

export const TicketsTableView = () => {
  const { ticketsListsColumn, ticketList } = useTicketsLists();
  return (
    <>
      <TanstackTable columns={ticketsListsColumn} data={ticketList} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};
