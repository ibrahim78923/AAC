import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  resetSelectedFolder,
  setIsPortalClose,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useDeleteServicesKnowledgeBaseSingleFolderMutation } from '@/services/airServices/knowledge-base/articles';
import { useGetFoldersApi } from '../../KnowledgeBaseHooks/useGetFoldersApi';

export const useDeleteFolder = () => {
  const { getArticlesFolderListForFilterData } = useGetFoldersApi?.();

  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );

  const [deleteFolderForArticleTrigger, deleteFolderForArticleStatus] =
    useDeleteServicesKnowledgeBaseSingleFolderMutation();

  const deleteFolder = async () => {
    const apiDataParameter = {
      queryParams: {
        Ids: selectedFolder?._id,
      },
    };
    try {
      await deleteFolderForArticleTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Folder deleted successfully!');
      await getArticlesFolderListForFilterData?.();
      dispatch(resetSelectedFolder());
      closeFolderDeleteModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeFolderDeleteModal = () => {
    dispatch(setIsPortalClose());
  };

  return {
    deleteFolder,
    deleteFolderForArticleStatus,
    closeFolderDeleteModal,
    isPortalOpen,
  };
};
