import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { RestoreReportIcon } from '@/assets/icons';
import { useRestoreReport } from './useRestoreReport';

const RestoreReport = () => {
  const {
    restoreReport,
    closeModal,
    restoreDeletedReportStatus,
    isPortalOpen,
  } = useRestoreReport();

  return (
    <AlertModals
      typeImage={<RestoreReportIcon />}
      type={`${ALERT_MODALS_TYPE?.RESTORE} Report`}
      message="You are about to restore a record !"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeModal}
      handleSubmitBtn={restoreReport}
      loading={restoreDeletedReportStatus?.isLoading}
      disableCancelBtn={restoreDeletedReportStatus?.isLoading}
      submitBtnText={'Restore'}
      cancelBtnText={'Cancel'}
    />
  );
};

export default RestoreReport;
