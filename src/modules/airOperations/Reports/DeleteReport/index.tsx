import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteReport } from './useDeleteReport';

export const DeleteReport = (props: any) => {
  const { isPortalOpen } = props;
  const { deleteReport, closeModal, deleteReportTemporaryStatus } =
    useDeleteReport(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete the selected report?"
      open={isPortalOpen?.isDelete}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => deleteReport?.()}
      loading={deleteReportTemporaryStatus?.isLoading}
      disableCancelBtn={deleteReportTemporaryStatus?.isLoading}
    />
  );
};
