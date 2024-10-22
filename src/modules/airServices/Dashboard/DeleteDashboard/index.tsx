import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteDashboard } from './useDeleteDashboard';

export const DeleteDashboard = () => {
  const {
    deleteDashboard,
    closeDashboardDeleteModal,
    apiCallInProgress,
    isPortalOpen,
  } = useDeleteDashboard();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete dashboard ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen}
        handleClose={closeDashboardDeleteModal}
        handleSubmitBtn={deleteDashboard}
        loading={apiCallInProgress}
        disableCancelBtn={apiCallInProgress}
      />
    </>
  );
};
