import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteBusinessHourMutation } from '@/services/airServices/settings/service-management/business-hours';
import { enqueueSnackbar } from 'notistack';
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
      enqueueSnackbar('Business Hour deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeBusinessHourDeleteModal?.();
    } catch (error: any) {
      enqueueSnackbar(
        error?.data?.message?.error ?? 'Business Hour not deleted',
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
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
