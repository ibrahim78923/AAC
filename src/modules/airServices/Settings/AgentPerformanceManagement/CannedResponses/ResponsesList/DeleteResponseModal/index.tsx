import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import useDeleteResponseModal from './useDeleteResponseModal';

export const DeleteResponseModal = ({
  deleteModal,
  setDeleteModal,
  setSelectedData,
  selectedData,
}: any) => {
  const { deleteResponses, isLoading } = useDeleteResponseModal({
    selectedData,
    setSelectedData,
    setDeleteModal,
  });

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={deleteResponses}
        loading={isLoading}
        disableCancelBtn={isLoading}
      />
    </>
  );
};
