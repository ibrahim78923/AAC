import { Box } from '@mui/material';
import { AlertModals } from '@/components/AlertModals';
import { TrashIcon } from '@/assets/icons';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import useDeleteHolidayModal from './useDeleteHolidayModal';

export const DeleteHolidayModal = ({ id, setHolidaysData }: any) => {
  const {
    setOpenDeleteModal,
    deleteHolidayStatus,
    openDeleteModal,
    deleteHoliday,
  } = useDeleteHolidayModal({ id, setHolidaysData });

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
        loading={deleteHolidayStatus?.isLoading}
        message={'Are you sure you want to delete this holiday?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleSubmitBtn={deleteHoliday}
      />
    </>
  );
};
