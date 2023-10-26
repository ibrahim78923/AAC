import TanstackTable from '@/components/Tabel/TanstackTable';
import { data, columns } from './RelatedTicketsTable.data';
import { RelatedTicketsDrawer } from './RelatedTicketsDrawer';
import { useRelatedTickets } from './useRelatedTickets';
import { RelatedTicketsHeader } from './RelatedTicketsHeader';

const RelatedTickets = () => {
  const { setIsDrawerOpen, isDrawerOpen, setActive, isActive } =
    useRelatedTickets();

  return (
    <div>
      <RelatedTicketsHeader
        isActive={isActive}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <RelatedTicketsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <br />
      <TanstackTable
        data={data}
        activeCheck={isActive}
        columns={columns(setIsDrawerOpen, isActive, setActive)}
      />
    </div>
  );
};
export default RelatedTickets;
