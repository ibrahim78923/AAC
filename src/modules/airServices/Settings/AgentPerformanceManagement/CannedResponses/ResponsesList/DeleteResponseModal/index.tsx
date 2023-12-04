import { AlertModals } from '@/components/AlertModals';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
export const DeleteResponseModal = ({
  deleteModal,
  setDeleteModal,
  setSelectedData,
}: any) => {
  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete?'}
        type={'delete'}
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
