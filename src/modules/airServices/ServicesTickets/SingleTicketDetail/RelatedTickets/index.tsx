import TanstackTable from '@/components/Table/TanstackTable';
import { data, columns } from './RelatedTickets.data';
import { useRelatedTickets } from './useRelatedTickets';
import { RelatedTicketsHeader } from './RelatedTicketsHeader';
import CreateRelatedTickets from './CreateRelatedTickets';

const RelatedTickets = () => {
  const { setIsDrawerOpen, isDrawerOpen, setActive, isActive, theme } =
    useRelatedTickets();

  return (
    <div>
      <RelatedTicketsHeader
        isActive={isActive}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <CreateRelatedTickets
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <br />
      <TanstackTable
        data={data}
        activeCheck={isActive}
        columns={columns(setIsDrawerOpen, isActive, setActive, theme)}
      />
    </div>
  );
};
export default RelatedTickets;
