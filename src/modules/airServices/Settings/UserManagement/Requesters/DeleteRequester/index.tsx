import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteRequester } from './useDeleteRequester';

export const DeleteRequester = (props: any) => {
  const { deleteModalOpen } = props;
  const { deleteRequester, closeRequesterDeleteModal, deleteRequesterStatus } =
    useDeleteRequester(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this Requester?"
      open={deleteModalOpen}
      handleClose={() => closeRequesterDeleteModal?.()}
      handleSubmitBtn={() => deleteRequester()}
      loading={deleteRequesterStatus?.isLoading}
      disableCancelBtn={deleteRequesterStatus?.isLoading}
    />
  );
};
