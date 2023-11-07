import { useTicketsLists } from '../useTicketsLists';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = (props: any) => {
  const { ticketsListsColumn } = props;
  const { ticketList } = useTicketsLists();
  return (
    <>
      <TanstackTable columns={ticketsListsColumn} data={ticketList} />
      <CustomPagination
        count={1}
        pageLimit={10}
        rowsPerPageOptions={[10, 25]}
        currentPage={1}
      />
    </>
  );
};
