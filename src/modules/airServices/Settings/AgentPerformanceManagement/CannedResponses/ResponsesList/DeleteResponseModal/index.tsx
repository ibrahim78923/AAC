import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
export const DeleteResponseModal = ({
  deleteModal,
  setDeleteModal,
  setSelectedData,
}: any) => {
  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete this response parentally?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={() => {
          setSelectedData([]);
          enqueueSnackbar('Deleted Successfully!', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          setDeleteModal(false);
        }}
      />
    </>
  );
};
