import useAuth from '@/hooks/useAuth';
import { useGetWorkloadScheduleQuery } from '@/services/airServices/settings/agent-performance-management/workload-management/workload-schedule';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useWorkloadSchedule = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectWorkloadSchedule, setSelectWorkloadSchedule] = useState('');
  const { user }: any = useAuth();
  const getWorkloadScheduleParameter = {
    queryParams: {
      id: user?._id,
    },
  };

  const { data, isLoading, isFetching, isError } = useGetWorkloadScheduleQuery(
    getWorkloadScheduleParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!user?._id,
    },
  );

  const setWorkloadScheduleForDelete = (id: any) => {
    setSelectWorkloadSchedule?.(id);
    setOpenDeleteModal?.(true);
  };
  return {
    openDeleteModal,
    setOpenDeleteModal,
    router,
    selectWorkloadSchedule,
    setSelectWorkloadSchedule,
    setWorkloadScheduleForDelete,
    data,
    isLoading,
    isFetching,
    isError,
  };
};
