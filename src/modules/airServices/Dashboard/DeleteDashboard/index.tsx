import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteDashboard } from './useDeleteDashboard';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';

export const DeleteDashboard = (
  props: ManageDashboardPortalComponentPropsI,
) => {
  const { isPortalOpen } = props;
  const {
    deleteDashboard,
    deleteSingleServicesDashboardStatus,
    closeDashboardDeleteModal,
  } = useDeleteDashboard(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete dashboard ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDelete as boolean}
        handleClose={closeDashboardDeleteModal}
        handleSubmitBtn={deleteDashboard}
        loading={deleteSingleServicesDashboardStatus?.isLoading}
        disableCancelBtn={deleteSingleServicesDashboardStatus?.isLoading}
      />
    </>
  );
};
