import { useDeleteBusinessHourMutation } from '@/services/airServices/settings/service-management/business-hours';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useDeleteBusinessHour = (props: any) => {
  const { id, handleActionClose } = props;
  const [openBusinessHour, setOpenBusinessHour] = useState(false);
  const closeBusinessHourDeleteModal = () => {
    setOpenBusinessHour?.(false);
    handleActionClose();
  };
  const [deleteBusinessHourTrigger, { isLoading }] =
    useDeleteBusinessHourMutation();
  const deleteBusinessHour = async () => {
    const deleteParams = new URLSearchParams();
    deleteParams?.append('id', id);
    const deleteBusinessHourParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteBusinessHourTrigger(deleteBusinessHourParameter)?.unwrap();
      successSnackbar('Business Hour deleted successfully');
      closeBusinessHourDeleteModal?.();
    } catch (error: any) {
      errorSnackbar();
      closeBusinessHourDeleteModal?.();
    }
  };
  return {
    setOpenBusinessHour,
    openBusinessHour,
    closeBusinessHourDeleteModal,
    deleteBusinessHour,
    isLoading,
  };
};
