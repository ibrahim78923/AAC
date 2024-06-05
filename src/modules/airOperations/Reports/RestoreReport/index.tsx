import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { RestoreReportIcon } from '@/assets/icons';
import { useRestoreReport } from './useRestoreReport';

export const RestoreReport = (props: any) => {
  const { isPortalOpen } = props;
  const { restoreReport, closeModal } = useRestoreReport(props);

  return (
    <AlertModals
      typeImage={<RestoreReportIcon />}
      type={`${ALERT_MODALS_TYPE?.RESTORE} Report`}
      message="You are about to restore a record"
      open={isPortalOpen?.isRestore}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => restoreReport?.()}
      loading={false}
      disableCancelBtn
      submitBtnText={'Restore'}
      cancelBtnText={'Cancel'}
    />
  );
};
