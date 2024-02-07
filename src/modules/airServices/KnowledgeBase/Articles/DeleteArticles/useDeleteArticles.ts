import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteArticleMutation } from '@/services/airServices/assets/knowledge-base/articles';
import { errorSnackbar } from '@/utils/api';
import { enqueueSnackbar } from 'notistack';

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
    selectedArticlesData?.forEach((id: any) => deleteParams?.append('Ids', id));
    const deleteArticlesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteArticleTrigger(deleteArticlesParameter)?.unwrap();
      enqueueSnackbar('Article deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
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
