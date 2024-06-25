import { AlertModals } from '@/components/AlertModals';
import { columns } from './Table.data';
import useTable from './useTable';
import TanstackTable from '@/components/Table/TanstackTable';
import { API_STATUS } from '@/constants';

const Table = ({ searchByName }: any) => {
  const {
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
    setIsDeleteModalOpen,
    setPage,
    setPageLimit,
    status,
    manageDashboadDataArray,
  } = useTable({ searchByName });

  const getColumns = columns(setIsDeleteModalOpen);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TanstackTable
        columns={getColumns}
        data={manageDashboadDataArray?.data?.salesDashboards}
        isLoading={status === API_STATUS?.PENDING ? true : false}
        isPagination={
          manageDashboadDataArray?.data?.salesDashboards?.length ? true : false
        }
        count={manageDashboadDataArray?.data?.meta?.pages}
        totalRecords={manageDashboadDataArray?.data?.meta?.total}
        onPageChange={handlePageChange}
        setPage={setPage}
        setPageLimit={setPageLimit}
        currentPage={manageDashboadDataArray?.data?.meta?.page}
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
