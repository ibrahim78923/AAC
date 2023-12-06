import { AlertModals } from '@/components/AlertModals';
import { ManageDashboardTableData, columns } from './Table.data';
import useTable from './useTable';
import TanstackTable from '@/components/Table/TanstackTable';

const Table = () => {
  const {
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
    setIsDeleteModalOpen,
  } = useTable();
  const getColumns = columns(setIsDeleteModalOpen);
  return (
    <>
      <TanstackTable
        columns={getColumns}
        data={ManageDashboardTableData}
        isPagination
      />

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
