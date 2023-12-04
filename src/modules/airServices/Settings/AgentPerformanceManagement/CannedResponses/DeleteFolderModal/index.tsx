import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { ALERT_MODALS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
export const DeleteFolderModal = ({ id, handleActionClose }: any) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <MenuItem sx={{ pr: 5 }} onClick={() => setOpenDeleteModal(true)}>
        Delete
      </MenuItem>
      <AlertModals
        message={'Are you sure you want to delete this Folder prenatally?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
          handleActionClose();
        }}
        handleSubmitBtn={() => {
          enqueueSnackbar(id + ' Folder deleted successfully', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
          setOpenDeleteModal(false);
          handleActionClose();
        }}
      />
    </>
  );
};
