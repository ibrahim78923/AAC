import { useDeleteArticleMutation } from '@/services/airServices/assets/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteArticles = (props: any) => {
  const {
    setDeleteModalOpen,
    selectedArticlesData,
    setSelectedArticlesData,
    setPage,
  } = props;
  const [deleteArticleTrigger, deleteArticleStatus] =
    useDeleteArticleMutation();

  const deleteArticles = async () => {
    const deleteParams = new URLSearchParams();
    selectedArticlesData?.forEach((id: any) => deleteParams?.append('ids', id));
    const deleteArticlesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteArticleTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Article deleted successfully');
      setSelectedArticlesData([]);
      setPage(1);
      closeArticleDeleteModal?.();
    } catch (error: any) {
      errorSnackbar?.();
      setSelectedArticlesData([]);
      closeArticleDeleteModal?.();
    }
  };
  const closeArticleDeleteModal = () => {
    setDeleteModalOpen?.(false);
  };

  return {
    deleteArticles,
    closeArticleDeleteModal,
    deleteArticleStatus,
  };
};
