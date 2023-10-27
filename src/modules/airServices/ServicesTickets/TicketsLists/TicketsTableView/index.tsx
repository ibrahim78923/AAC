// import CustomPagination from '@/components/CustomPagination';
import { useTicketsLists } from '../useTicketsLists';
import CustomPagination from '@/components/CustomPagination';
import { ticketsListsColumnFunction } from '../TicketsLists.data';
import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = () => {
  const {
    theme,
    router,
    ticketList,
    selectedTicketList,
    setSelectedTicketList,
    handleChange,
  } = useTicketsLists();
  return (
    <>
      <TanstackTable
        columns={ticketsListsColumnFunction(
          theme,
          router,
          ticketList,
          selectedTicketList,
          setSelectedTicketList,
          handleChange,
        )}
        data={ticketList}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};
