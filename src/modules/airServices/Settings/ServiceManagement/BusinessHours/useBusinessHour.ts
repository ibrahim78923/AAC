import {
  useDeleteAirServicesSettingsServiceBusinessHourMutation,
  useGetAirServicesSettingsServiceBusinessHourQuery,
} from '@/services/airServices/settings/service-management/business-hours';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
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
    useGetAirServicesSettingsServiceBusinessHourQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const businessHoursList = data?.data;

  const [deleteBusinessHourTrigger, deleteBusinessHourStatus] =
    useDeleteAirServicesSettingsServiceBusinessHourMutation();

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
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
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
