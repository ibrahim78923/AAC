import TanstackTable from '@/components/Table/TanstackTable';
import { ticketsListData } from './Tickets.data';
import { useTickets } from './useTickets';
import TicketsHeader from './TicketsHeader';

const Tickets = () => {
  const { ticketsListsColumns, selectedTicketsList } = useTickets();
  return (
    <>
      <TicketsHeader selectedTicketsList={selectedTicketsList} />
      <TanstackTable
        data={ticketsListData}
        columns={ticketsListsColumns}
        isPagination
      />
    </>
  );
};

export default Tickets;
