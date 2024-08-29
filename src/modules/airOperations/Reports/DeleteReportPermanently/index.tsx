import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteReportPermanently } from './useDeleteReportPermanently';
import { RestoreReportsListsComponentPropsI } from '../RestoreReportsLists/RestoreReportsLists.interface';

export const DeleteReportPermanently = (
  props: RestoreReportsListsComponentPropsI,
) => {
  const { isPortalOpen } = props;
  const { deleteReport, closeModal, deleteRestoreReportPermanentlyStatus } =
    useDeleteReportPermanently(props);

  return (
    <AlertModals
      type={`Permanently ${ALERT_MODALS_TYPE?.DELETE}`}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      open={isPortalOpen?.isDelete as boolean}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => deleteReport?.()}
      loading={deleteRestoreReportPermanentlyStatus?.isLoading}
      disableCancelBtn={deleteRestoreReportPermanentlyStatus?.isLoading}
      submitBtnText="Delete"
      cancelBtnText="Cancel"
    />
  );
};
