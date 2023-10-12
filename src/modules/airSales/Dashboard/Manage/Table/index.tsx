import TanstackTable from '@/components/Tabel/TanstackTable';
import { AlertModals } from '@/components/AlertModals';

import { ManageDashboardTableData, columns } from './Table.data';
import useTable from './useTable';

const Table = () => {
  const {
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
    setIsDeleteModalOpen,
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
  } = useTable();
  const getColumns = columns(
    setIsDeleteModalOpen,
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
  );
  return (
    <>
      <TanstackTable columns={getColumns} data={ManageDashboardTableData} />
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
