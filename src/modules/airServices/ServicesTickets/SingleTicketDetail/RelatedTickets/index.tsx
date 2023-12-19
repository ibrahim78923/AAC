import TanstackTable from '@/components/Table/TanstackTable';
import { data, columns } from './RelatedTickets.data';
import { useRelatedTickets } from './useRelatedTickets';
import { RelatedTicketsHeader } from './RelatedTicketsHeader';
import CreateRelatedTickets from './CreateRelatedTickets';

const RelatedTickets = (props: any) => {
  const {
    setIsDrawerOpen,
    isDrawerOpen,
    drawerType,
    setDrawerType,
    setActive,
    isActive,
    theme,
  } = useRelatedTickets();
  const {} = props;
  return (
    <div>
      <RelatedTicketsHeader
        isActive={isActive}
        setIsDrawerOpen={setIsDrawerOpen}
        setDrawerType={setDrawerType}
      />
      <CreateRelatedTickets
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        drawerType={drawerType}
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
