import TanstackTable from '@/components/Table/TanstackTable';
import BroadcastHeader from './BroadcastHeader';
import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useBroadcast from './useBroadcast';
import { broadcastColumns, broadcastData } from './Broadcast.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';

const Broadcast = () => {
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
      <BroadcastHeader handleOpenDelete={handleOpenDelete} />

      <PermissionsGuard
        permissions={[AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.LIST_VIEW]}
      >
        <TanstackTable
          columns={broadcastColumns(statusTag, theme)}
          data={broadcastData}
          isPagination
          count={2}
          totalRecords={12}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </PermissionsGuard>

      {openModalDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={openModalDelete}
          handleClose={handleCloseDelete}
          handleSubmit={handleCloseDelete}
        />
      )}
    </>
  );
};

export default Broadcast;
