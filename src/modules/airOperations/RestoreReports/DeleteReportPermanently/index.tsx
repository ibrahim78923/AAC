import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteReportPermanently } from './useDeleteReportPermanently';

const DeleteReportPermanently = () => {
  const {
    deleteReport,
    closeModal,
    deleteRestoreReportPermanentlyStatus,
    isPortalOpen,
  } = useDeleteReportPermanently();

  return (
    <AlertModals
      type={`Permanently ${ALERT_MODALS_TYPE?.DELETE}`}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeModal}
      handleSubmitBtn={deleteReport}
      loading={deleteRestoreReportPermanentlyStatus?.isLoading}
      disableCancelBtn={deleteRestoreReportPermanentlyStatus?.isLoading}
      submitBtnText="Delete"
      cancelBtnText="Cancel"
    />
  );
};
export default DeleteReportPermanently;
