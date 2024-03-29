import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteLocation } from './useDeleteLocation';

export const DeleteLocation = (props: any) => {
  const { deleteModalOpen } = props;
  const {
    handleParentDeleteLocation,
    closeDeleteModal,
    deleteParentLocationStatus,
    deleteChildLocationStatus,
  } = useDeleteLocation(props);

  return (
    <AlertModals
      message={'Are you sure you want to delete this location?'}
      type={ALERT_MODALS_TYPE?.DELETE}
      open={deleteModalOpen}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => handleParentDeleteLocation?.()}
      loading={
        deleteParentLocationStatus?.isLoading ||
        deleteChildLocationStatus?.isLoading
      }
      disableCancelBtn={
        deleteParentLocationStatus?.isLoading ||
        deleteChildLocationStatus?.isLoading
      }
    />
  );
};
