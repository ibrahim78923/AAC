import TanstackTable from '@/components/Table/TanstackTable';
import Header from '../Header';
import { ticketsListData } from './Tickets.data';
import { useTickets } from './useTickets';

const Tickets = () => {
  const { ticketsListsColumns, selectedTicketsList } = useTickets();
  return (
    <>
      <Header selectedTicketsList={selectedTicketsList} />
      <TanstackTable
        data={ticketsListData}
        columns={ticketsListsColumns}
        isPagination
      />
    </>
  );
};

export default Tickets;
