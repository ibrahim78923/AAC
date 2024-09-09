import { useDeleteFolderForArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  setIsPortalClose,
  setSelectedFolder,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ALL_FOLDER } from '../Folder.data';

export const useDeleteFolder = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );
  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );
  const [deleteFolderForArticleTrigger, deleteFolderForArticleStatus] =
    useDeleteFolderForArticleMutation();

  const deleteFolder = async () => {
    const apiDataParameter = {
      queryParams: {
        Ids: selectedFolder?._id,
      },
    };
    try {
      await deleteFolderForArticleTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Folder deleted successfully!');
      closeFolderDeleteModal?.();
      dispatch(setSelectedFolder?.({ _id: ALL_FOLDER }));
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
