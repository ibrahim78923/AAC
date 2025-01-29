import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import useDeleteResponseModal from './useDeleteResponseModal';

export const DeleteResponseModal = (props: any) => {
  const { isPortalOpen } = props;
  const { deleteResponses, isLoading, closeModal } =
    useDeleteResponseModal(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen}
        handleClose={closeModal}
        handleSubmitBtn={deleteResponses}
        loading={isLoading}
        disableCancelBtn={isLoading}
      />
    </>
  );
};
