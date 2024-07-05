import TanstackTable from '@/components/Table/TanstackTable';
import { detailsColumns } from './DetailsTable.data';

const DetailsTable = ({ setOpenModalDelete, recepientsData }: any) => {
  return (
    <TanstackTable
      columns={detailsColumns(setOpenModalDelete)}
      data={recepientsData}
    />
  );
};

export default DetailsTable;
