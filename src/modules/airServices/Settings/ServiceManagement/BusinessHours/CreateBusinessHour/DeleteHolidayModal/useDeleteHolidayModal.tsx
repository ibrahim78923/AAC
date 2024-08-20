import { useDeleteHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export default function useDeleteHolidayModal({ id, setHolidaysData }: any) {
  const searchParams = useSearchParams();
  const businessHourId: any = searchParams.get('id');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteHolidayTrigger, deleteHolidayStatus] =
    useDeleteHolidayMutation();
  const deleteHoliday = async () => {
    if (!!!businessHourId) {
      setHolidaysData((pervState: any) =>
        pervState.filter((item: any) => item?.uuid !== id),
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
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      setOpenDeleteModal(false);
    }
  };

  return {
    setOpenDeleteModal,
    deleteHolidayStatus,
    openDeleteModal,
    deleteHoliday,
  };
}
