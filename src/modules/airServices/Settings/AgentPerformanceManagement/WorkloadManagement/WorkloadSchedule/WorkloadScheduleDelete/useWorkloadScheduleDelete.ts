import { useDeleteArticleMutation } from '@/services/airServices/assets/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useWorkloadScheduleDelete = (props: any) => {
  const {
    setOpenDeleteModal,
    setPage,
    selectWorkloadSchedule,
    setSelectWorkloadSchedule,
  } = props;

  const [deleteArticleTrigger, deleteArticleStatus] =
    useDeleteArticleMutation();

  const deleteWorkloadSchedule = async () => {
    const deleteParams = new URLSearchParams();
    selectWorkloadSchedule?.forEach(
      (id: any) => deleteParams?.append('ids', id),
    );
    const deleteArticlesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteArticleTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Article deleted successfully');
      setPage?.(1);
      setSelectWorkloadSchedule?.('');
      closeWorkloadScheduleDeleteModal?.();
    } catch (error: any) {
      errorSnackbar?.();
      setSelectWorkloadSchedule?.('');
      closeWorkloadScheduleDeleteModal?.();
    }
  };
  const closeWorkloadScheduleDeleteModal = () => {
    setOpenDeleteModal?.(false);
  };

  return {
    deleteWorkloadSchedule,
    closeWorkloadScheduleDeleteModal,
    deleteArticleStatus,
  };
};
