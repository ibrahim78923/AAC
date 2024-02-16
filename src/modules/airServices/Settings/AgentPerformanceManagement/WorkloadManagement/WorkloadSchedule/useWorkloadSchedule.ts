import { useRouter } from 'next/router';
import { useState } from 'react';

export const useWorkloadSchedule = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectWorkloadSchedule, setSelectWorkloadSchedule] = useState('');

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
  };
};
