import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useCloneReport } from './useCloneReport';
import { CloneReportIcon } from '@/assets/icons';

export const CloneReport = (props: any) => {
  const { isPortalOpen } = props;
  const { cloneReport, closeModal, cloneReportsStatus } = useCloneReport(props);

  return (
    <AlertModals
      typeImage={<CloneReportIcon />}
      type={ALERT_MODALS_TYPE?.INFO}
      message="Do you want to clone this report?"
      open={isPortalOpen?.isClone}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => cloneReport?.()}
      loading={cloneReportsStatus?.isLoading}
      disableCancelBtn={cloneReportsStatus?.isLoading}
    />
  );
};
