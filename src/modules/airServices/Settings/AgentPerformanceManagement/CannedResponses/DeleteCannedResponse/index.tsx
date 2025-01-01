import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteCannedResponse } from './useDeleteCannedResponse';

export const DeleteCannedResponse = (props: any) => {
  const { isPortalOpen } = props;

  const { isLoading, deleteCannedResponse, closeModal } =
    useDeleteCannedResponse(props);

  return (
    <AlertModals
      message={'Are you sure you want to delete this Folder?'}
      type={ALERT_MODALS_TYPE?.DELETE}
      open={isPortalOpen?.delete}
      loading={isLoading}
      disableCancelBtn={isLoading}
      handleClose={closeModal}
      handleSubmitBtn={deleteCannedResponse}
    />
  );
};
