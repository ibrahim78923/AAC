import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteTiers } from './useDeleteTiers';

export const DeleteTiers = () => {
  const { deleteLoyaltyTier, closePortal, apiCallInProgress, isPortalOpen } =
    useDeleteTiers();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete tier ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen}
        handleClose={closePortal}
        handleSubmitBtn={deleteLoyaltyTier}
        loading={apiCallInProgress}
        disableCancelBtn={apiCallInProgress}
      />
    </>
  );
};
