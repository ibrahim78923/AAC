import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteFolder } from './useDeleteFolder';

export const DeleteFolder = () => {
  const {
    deleteFolder,
    deleteFolderForArticleStatus,
    closeFolderDeleteModal,
    isPortalOpen,
  } = useDeleteFolder();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete folder ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen as boolean}
        handleClose={() => closeFolderDeleteModal?.()}
        handleSubmitBtn={() => deleteFolder?.()}
        loading={deleteFolderForArticleStatus?.isLoading}
        disableCancelBtn={deleteFolderForArticleStatus?.isLoading}
      />
    </>
  );
};
