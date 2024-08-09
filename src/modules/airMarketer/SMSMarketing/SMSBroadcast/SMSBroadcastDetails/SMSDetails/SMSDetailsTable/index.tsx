import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { smsDetailsColumns } from './SMSDetailsTable.data';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useSMSBroadcastDetails from '../../useSMSBroadcastDetails';
import { SMSDetailsTableProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';

const SMSDetailsTable = ({ recipientsData, loading }: SMSDetailsTableProps) => {
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
    </>
  );
};

export default SMSDetailsTable;
