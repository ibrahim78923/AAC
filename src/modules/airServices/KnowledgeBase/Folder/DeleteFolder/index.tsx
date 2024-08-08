import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteFolder } from './useDeleteFolder';

export const DeleteFolder = (props: any) => {
  const { isPortalOpen } = props;
  const {
    deleteFolder,
    deleteSingleServicesFolderStatus,
    closeFolderDeleteModal,
  } = useDeleteFolder(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete folder ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDeleteFolder}
        handleClose={() => closeFolderDeleteModal?.()}
        handleSubmitBtn={() => deleteFolder?.()}
        loading={deleteSingleServicesFolderStatus?.isLoading}
        disableCancelBtn={deleteSingleServicesFolderStatus?.isLoading}
      />
    </>
  );
};
