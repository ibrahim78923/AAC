import TanstackTable from '@/components/Table/TanstackTable';
import BroadcastHeader from './BroadcastHeader';
import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useBroadcast from './useBroadcast';
import { broadcastColumns, broadcastData } from './Broadcast.data';

const Broadcast = ({ setIsCreateBroadcast }: any) => {
  const {
    theme,
    statusTag,
    openModalDelete,
    handleOpenDelete,
    handleCloseDelete,
    setPageLimit,
    setPage,
    handlePageChange,
  } = useBroadcast();
  return (
    <>
      <BroadcastHeader
        handleOpenDelete={handleOpenDelete}
        setIsCreateBroadcast={setIsCreateBroadcast}
      />

      <TanstackTable
        columns={broadcastColumns(statusTag, theme)}
        data={broadcastData}
        // isLoading={loagingGetFaqs}
        isPagination
        count={2}
        totalRecords={12}
        onPageChange={handlePageChange}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />

      <AlertModals
        message="Are you sure you want to delete this broadcast?"
        type="Delete SMS Broadcast"
        typeImage={<AlertModalDeleteIcon />}
        open={openModalDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleCloseDelete}
      />
    </>
  );
};

export default Broadcast;
