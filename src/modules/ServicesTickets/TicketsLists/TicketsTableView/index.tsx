import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { useTicketsLists } from '../useTicketsLists';
import { ticketsListsData } from '../TicketsLists.data';

export const TicketsTableView = () => {
  const { ticketsListsColumn } = useTicketsLists();
  return (
    <>
      <TanstackTable columns={ticketsListsColumn} data={ticketsListsData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};
