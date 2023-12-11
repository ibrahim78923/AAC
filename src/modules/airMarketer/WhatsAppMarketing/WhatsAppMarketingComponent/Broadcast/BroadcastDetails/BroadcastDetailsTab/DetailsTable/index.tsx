import TanstackTable from '@/components/Table/TanstackTable';
import { detailsColumns, detailsData } from './DetailsTable.data';

const DetailsTable = ({ deleteBroadcast }: any) => {
  return (
    <>
      <TanstackTable
        columns={detailsColumns(deleteBroadcast)}
        data={detailsData}
      />
    </>
  );
};

export default DetailsTable;
