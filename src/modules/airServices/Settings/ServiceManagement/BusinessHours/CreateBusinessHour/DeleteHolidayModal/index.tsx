import { Box } from '@mui/material';
import { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { TrashIcon } from '@/assets/icons';
import { ALERT_MODALS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { useSearchParams } from 'next/navigation';
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
      enqueueSnackbar('Holiday deleted successfully', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
      const response: any = await deleteHolidayTrigger(
        deleteHolidayParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Holiday deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenDeleteModal(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.error ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
