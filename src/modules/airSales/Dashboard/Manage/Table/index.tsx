import TanstackTable from '@/components/Tabel/TanstackTable';
import { ManageDashboardTableData, columns } from './Table.data';
import { AlertModals } from '@/components/AlertModals';
import useTable from './useTable';

const Table = () => {
  const { isDeleteModalOpen, handleCloseDeleteModal, handleDelete } =
    useTable();
  return (
    <>
      <TanstackTable columns={columns} data={ManageDashboardTableData} />

      <AlertModals
        message="Are you sure you want to delete dashboard"
        type="delete"
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDelete}
      />
    </>
  );
};
export default Table;
