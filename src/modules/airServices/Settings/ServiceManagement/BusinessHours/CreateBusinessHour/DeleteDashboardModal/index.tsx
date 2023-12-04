import { Box } from '@mui/material';
import { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { TrashIcon } from '@/assets/icons';
import { ALERT_MODALS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
export const DeleteHolidayModal = ({ id }: any) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <Box
        display="inline-block"
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpenDeleteModal(true)}
      >
        <TrashIcon />
      </Box>
      <AlertModals
        message={'Are you sure you want to delete this holiday?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleSubmitBtn={() => {
          enqueueSnackbar(id + ' Holiday deleted successfully', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};
