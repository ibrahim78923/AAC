// import CustomPagination from '@/components/CustomPagination';
import { useTicketsLists } from '../useTicketsLists';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = (props: any) => {
  const { ticketsListsColumn } = props;
  const { ticketList } = useTicketsLists();
  return (
    <>
      <TanstackTable columns={ticketsListsColumn} data={ticketList} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};
