import { PAGINATION } from '@/config';
import { AIR_SERVICES } from '@/constants';
import { useDeleteArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedArticlesList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { useGetArticlesApi } from '../../KnowledgeBaseHooks/useGetArticlesApi';

export const useDeleteArticles = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const totalRecords = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.totalRecords,
  );

  const selectedArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedArticlesList,
  );

  const { getArticlesListData, page } = useGetArticlesApi?.();

  const [deleteArticleTrigger, deleteArticleStatus] =
    useDeleteArticleMutation();
  const router = useRouter();
  const isMoveBack = !!router?.query?.articleId;

  const refetchApi = async () => {
    if (isMoveBack) {
      router?.push({
        pathname: AIR_SERVICES?.KNOWLEDGE_BASE,
      });
      return;
    }
    const newPage =
      selectedArticlesList?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getArticlesListData?.(newPage);
  };

  const deleteArticles = async () => {
    const deleteParams = new URLSearchParams();

    selectedArticlesList?.forEach(
      (article: { _id: string }) => deleteParams?.append('ids', article?._id),
    );

    const deleteArticlesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteArticleTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Article deleted successfully');
      closeArticleDeleteModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeArticleDeleteModal = () => {
    dispatch(emptySelectedArticlesList());
    dispatch(setIsPortalClose());
  };

  return {
    deleteArticles,
    closeArticleDeleteModal,
    deleteArticleStatus,
    isPortalOpen,
  };
};
