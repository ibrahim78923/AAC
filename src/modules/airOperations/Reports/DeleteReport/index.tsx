import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteReport } from './useDeleteReport';

export const DeleteReport = () => {
  const {
    deleteReport,
    closeModal,
    deleteReportTemporaryStatus,
    isPortalOpen,
  } = useDeleteReport();

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete the selected report?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeModal}
      handleSubmitBtn={deleteReport}
      loading={deleteReportTemporaryStatus?.isLoading}
      disableCancelBtn={deleteReportTemporaryStatus?.isLoading}
    />
  );
};
