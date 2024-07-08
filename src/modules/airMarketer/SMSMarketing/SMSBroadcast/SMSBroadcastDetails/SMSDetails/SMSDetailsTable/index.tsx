import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { smsDetailsColumns } from './SMSDetailsTable.data';
// import useSMSBroadcast from '../../../useSMSBroadcast';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useSMSBroadcastDetails from '../../useSMSBroadcastDetails';

const SMSDetailsTable = ({ recipientsData, loading }: any) => {
  // const { isDelete, handleDelete, setIsDelete } = useSMSBroadcast();
  const {
    openModalDelete,
    handleCloseDelete,
    handleDeleteRecipient,
    updateBroadcastLoading,
    setOpenModalDelete,
  } = useSMSBroadcastDetails();
  return (
    <>
      <TanstackTable
        columns={smsDetailsColumns(setOpenModalDelete)}
        data={recipientsData}
        isLoading={loading}
      />

      {openModalDelete?.isToggle && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={openModalDelete?.isToggle}
          handleClose={handleCloseDelete}
          handleSubmitBtn={() => {
            handleDeleteRecipient(openModalDelete?.recipientId);
          }}
          loading={updateBroadcastLoading}
        />
      )}

      {/* {isDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast contact?"
          type="Delete SMS Broadcast Contact"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() => setIsDelete(false)}
          handleSubmit={() => setIsDelete(false)}
        />
        
      )} */}
    </>
  );
};

export default SMSDetailsTable;
