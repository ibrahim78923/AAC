import { AlertModals } from '@/components/AlertModals';
import { useDeleteArticles } from './useDeleteArticles';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

const DeleteArticles = () => {
  const {
    deleteArticles,
    closeArticleDeleteModal,
    deleteArticleStatus,
    isPortalOpen,
  } = useDeleteArticles();

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Do you want to delete the selected article?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeArticleDeleteModal}
      handleSubmitBtn={deleteArticles}
      loading={deleteArticleStatus?.isLoading}
      disableCancelBtn={deleteArticleStatus?.isLoading}
    />
  );
};

export default DeleteArticles;
