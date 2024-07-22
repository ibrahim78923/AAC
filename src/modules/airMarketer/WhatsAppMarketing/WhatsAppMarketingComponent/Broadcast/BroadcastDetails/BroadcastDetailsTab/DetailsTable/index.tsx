import TanstackTable from '@/components/Table/TanstackTable';
import { detailsColumns } from './DetailsTable.data';

const DetailsTable = ({ setOpenModalDelete, recepientsData, loading }: any) => {
  return (
    <TanstackTable
      columns={detailsColumns(setOpenModalDelete)}
      data={recepientsData}
      isLoading={loading}
    />
  );
};

export default DetailsTable;
