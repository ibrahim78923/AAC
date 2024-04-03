import { Box } from '@mui/material';
import { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import { TrashIcon } from '@/assets/icons';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
export const DeleteHolidayModal = ({ id, setHolidaysData }: any) => {
  const searchParams = useSearchParams();
  const businessHourId: any = searchParams.get('id');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteHolidayTrigger, deleteHolidayStatus] =
    useDeleteHolidayMutation();
  const deleteHoliday = async () => {
    if (!!!businessHourId) {
      setHolidaysData((pervState: any) =>
        pervState.filter((item: any) => item.uuid !== id),
      );
      errorSnackbar('Holiday deleted successfully');
      setOpenDeleteModal(false);
      return;
    }
    const deleteParams = new URLSearchParams();
    deleteParams?.append('id', businessHourId);
    deleteParams?.append('holidayUuid', id);
    const deleteHolidayParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteHolidayTrigger(deleteHolidayParameter)?.unwrap();
      successSnackbar('Holiday deleted successfully');
      setOpenDeleteModal(false);
    } catch (error: any) {
      errorSnackbar();
      setOpenDeleteModal(false);
    }
  };
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
