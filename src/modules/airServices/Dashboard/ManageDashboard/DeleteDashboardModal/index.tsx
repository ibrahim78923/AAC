import { Box } from '@mui/material';
import { useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { AlertModals } from '@/components/AlertModals';
import { successSnackbar } from '@/utils/api';
export const DeleteDashboardModal = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenDeleteModal(true)}>
        <CancelRoundedIcon color="error" sx={{ fontSize: '24px' }} />
      </Box>
      <AlertModals
        message={'Are you sure you want to delete dashboard'}
        type={'delete'}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleSubmitBtn={() => {
          successSnackbar('Dashboard deleted successfully');
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};
