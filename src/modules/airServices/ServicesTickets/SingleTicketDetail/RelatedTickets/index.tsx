import TanstackTable from '@/components/Table/TanstackTable';
import { data, columns } from './RelatedTicketsTable.data';
import { CreateRelatedTicketsDrawer } from './CreateRelatedTickets/CreateRelatedTicketsDrawer';
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
      <CreateRelatedTicketsDrawer
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
