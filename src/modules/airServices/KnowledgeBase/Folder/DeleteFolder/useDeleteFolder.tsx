import { useDeleteFolderForArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';
import { ALL_FOLDER } from '../../Articles/Articles.data';

export const useDeleteFolder = (props: ArticlesPortalComponentPropsI) => {
  const { getFolderListData, setIsPortalOpen, isPortalOpen, setFolder } = props;

  const [deleteFolderForArticleTrigger, deleteFolderForArticleStatus] =
    useDeleteFolderForArticleMutation();

  const deleteFolder = async () => {
    const apiDataParameter = {
      queryParams: {
        Ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteFolderForArticleTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Folder deleted successfully!');
      closeFolderDeleteModal?.();
      setFolder?.({ _id: ALL_FOLDER });
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
