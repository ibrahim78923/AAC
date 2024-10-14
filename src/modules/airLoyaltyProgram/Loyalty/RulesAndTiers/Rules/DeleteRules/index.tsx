import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteRules } from './useDeleteRules';

export const DeleteRules = () => {
  const { deleteRule, closePortal, apiCallInProgress, isPortalOpen } =
    useDeleteRules();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete rule ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen}
        handleClose={closePortal}
        handleSubmitBtn={deleteRule}
        loading={apiCallInProgress}
        disableCancelBtn={apiCallInProgress}
      />
    </>
  );
};
