import TanstackTable from '@/components/Table/TanstackTable';
import { detailsColumns } from './DetailsTable.data';

const DetailsTable = ({
  setOpenModalDelete,
  recepientsData,
  loading,
  recordStatus,
}: any) => {
  return (
    <TanstackTable
      columns={detailsColumns(setOpenModalDelete, recordStatus)}
      data={recepientsData}
      isLoading={loading}
    />
  );
};

export default DetailsTable;
