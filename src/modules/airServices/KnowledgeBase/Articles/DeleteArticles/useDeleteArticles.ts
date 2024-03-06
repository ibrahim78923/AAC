import { AIR_SERVICES } from '@/constants';
import { useDeleteArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useDeleteArticles = (props: any) => {
  const {
    setDeleteModalOpen,
    selectedArticlesData,
    setSelectedArticlesData,
    setPage,
    moveBack = false,
    getValueArticlesListData,
    totalRecords,
    page,
  } = props;
  const [deleteArticleTrigger, deleteArticleStatus] =
    useDeleteArticleMutation();
  const router = useRouter();
  const deleteArticles = async () => {
    const deleteParams = new URLSearchParams();
    selectedArticlesData?.forEach((id: any) => deleteParams?.append('ids', id));
    const deleteArticlesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteArticleTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Article deleted successfully');
      setSelectedArticlesData?.([]);
      setPage?.(selectedArticlesData?.length === totalRecords ? 1 : page);
      const newPage = selectedArticlesData?.length === totalRecords ? 1 : page;
      await getValueArticlesListData?.(newPage);
      closeArticleDeleteModal?.();
      moveBack && moveToArticleList?.();
    } catch (error: any) {
      errorSnackbar?.();
      setSelectedArticlesData?.([]);
      closeArticleDeleteModal?.();
    }
  };
  const closeArticleDeleteModal = () => {
    setDeleteModalOpen?.(false);
  };

  const moveToArticleList = () => {
    router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
  };
  return {
    deleteArticles,
    closeArticleDeleteModal,
    deleteArticleStatus,
  };
};
