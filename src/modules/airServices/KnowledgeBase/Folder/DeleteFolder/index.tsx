import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteFolder } from './useDeleteFolder';
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';

export const DeleteFolder = (props: ArticlesPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const { deleteFolder, deleteFolderForArticleStatus, closeFolderDeleteModal } =
    useDeleteFolder(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete folder ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDeleteFolder as boolean}
        handleClose={() => closeFolderDeleteModal?.()}
        handleSubmitBtn={() => deleteFolder?.()}
        loading={deleteFolderForArticleStatus?.isLoading}
        disableCancelBtn={deleteFolderForArticleStatus?.isLoading}
      />
    </>
  );
};
