import { MenuItem } from '@mui/material';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteFolderModal } from './useDeleteFolderModal';
export const DeleteFolderModal = (props: any) => {
  const {
    setOpenDeleteModal,
    openDeleteModal,
    closeCannedResponseDeleteModal,
    deleteCannedResponse,
    isLoading,
  } = useDeleteFolderModal(props);
  return (
    <>
      <MenuItem sx={{ pr: 5 }} onClick={() => setOpenDeleteModal(true)}>
        Delete
      </MenuItem>
      <AlertModals
        message={'Are you sure you want to delete this Folder?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        loading={isLoading}
        handleClose={closeCannedResponseDeleteModal}
        handleSubmitBtn={deleteCannedResponse}
      />
    </>
  );
};
