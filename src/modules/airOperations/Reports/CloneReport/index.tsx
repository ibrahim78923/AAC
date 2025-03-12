import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useCloneReport } from './useCloneReport';
import { CloneReportIcon } from '@/assets/icons';

const CloneReport = () => {
  const { cloneReport, closeModal, cloneReportsStatus, isPortalOpen } =
    useCloneReport();

  return (
    <AlertModals
      typeImage={<CloneReportIcon />}
      type={ALERT_MODALS_TYPE?.INFO}
      message="Do you want to clone this report ?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeModal}
      handleSubmitBtn={cloneReport}
      loading={cloneReportsStatus?.isLoading}
      disableCancelBtn={cloneReportsStatus?.isLoading}
    />
  );
};

export default CloneReport;
