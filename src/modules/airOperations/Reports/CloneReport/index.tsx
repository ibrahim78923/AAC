import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useCloneReport } from './useCloneReport';

export const CloneReport = (props: any) => {
  const { isPortalOpen } = props;
  const { cloneReport, closeModal } = useCloneReport(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.INFO}
      message="Are you sure you want to delete the selected inventory?"
      open={isPortalOpen?.isDelete}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => cloneReport?.()}
      cancelBtnText="Cancel"
      loading={false}
      disableCancelBtn
    />
  );
};
