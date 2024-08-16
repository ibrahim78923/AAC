import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { RestoreReportIcon } from '@/assets/icons';
import { useRestoreReport } from './useRestoreReport';
import { RestoreReportsListsComponentPropsI } from '../RestoreReportsLists/RestoreReportsLists.interface';

export const RestoreReport = (props: RestoreReportsListsComponentPropsI) => {
  const { isPortalOpen } = props;
  const { restoreReport, closeModal, restoreDeletedReportStatus } =
    useRestoreReport(props);

  return (
    <AlertModals
      typeImage={<RestoreReportIcon />}
      type={`${ALERT_MODALS_TYPE?.RESTORE} Report`}
      message="You are about to restore a record"
      open={isPortalOpen?.isRestore as boolean}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => restoreReport?.()}
      loading={restoreDeletedReportStatus?.isLoading}
      disableCancelBtn={restoreDeletedReportStatus?.isLoading}
      submitBtnText={'Restore'}
      cancelBtnText={'Cancel'}
    />
  );
};
