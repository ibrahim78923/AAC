import { useDeleteFolderForArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';

export const useDeleteFolder = (props: ArticlesPortalComponentPropsI) => {
  const { getFolderListData, setIsPortalOpen, isPortalOpen } = props;

  const [deleteFolderForArticleTrigger, deleteFolderForArticleStatus] =
    useDeleteFolderForArticleMutation();

  const deleteFolder = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteFolderForArticleTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Folder deleted successfully!');
      closeFolderDeleteModal?.();
      await getFolderListData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeFolderDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  return {
    deleteFolder,
    deleteFolderForArticleStatus,
    closeFolderDeleteModal,
  };
};
