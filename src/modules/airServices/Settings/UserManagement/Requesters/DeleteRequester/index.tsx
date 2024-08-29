import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteRequester } from './useDeleteRequester';
import { IRequestersProps } from '../Requesters.interface';

export const DeleteRequester = (props: IRequestersProps) => {
  const { deleteModalOpen } = props;
  const { deleteRequester, closeRequesterDeleteModal, deleteRequesterStatus } =
    useDeleteRequester(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this Requester?"
      open={deleteModalOpen as boolean}
      handleClose={() => closeRequesterDeleteModal?.()}
      handleSubmitBtn={() => deleteRequester()}
      loading={deleteRequesterStatus?.isLoading}
      disableCancelBtn={deleteRequesterStatus?.isLoading}
    />
  );
};
