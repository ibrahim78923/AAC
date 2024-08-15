import {
  useDeleteBusinessHourMutation,
  useGetBusinessHourQuery,
} from '@/services/airServices/settings/service-management/business-hours';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const useBusinessHour = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<any>({
    delete: false,
    id: null,
  });

  const { data, isLoading, isFetching, isError, refetch } =
    useGetBusinessHourQuery({
      refetchOnMountOrArgChange: true,
    });

  const businessHoursList = data?.data;

  const [deleteBusinessHourTrigger, deleteBusinessHourStatus] =
    useDeleteBusinessHourMutation();

  const deleteBusinessHour = async () => {
    const deleteParams = new URLSearchParams();
    deleteParams?.append('id', openModal?.id);
    const deleteBusinessHourParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteBusinessHourTrigger(deleteBusinessHourParameter)?.unwrap();
      successSnackbar('Business Hour deleted successfully');
      setOpenModal({
        delete: false,
        editData: null,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setOpenModal({
        delete: false,
        editData: null,
      });
    }
  };

  return {
    router,
    businessHoursList,
    isLoading,
    setOpenModal,
    openModal,
    isFetching,
    isError,
    refetch,
    deleteBusinessHour,
    deleteBusinessHourStatus,
  };
};
