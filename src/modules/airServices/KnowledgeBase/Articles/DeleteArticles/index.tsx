import { AlertModals } from '@/components/AlertModals';
import { useDeleteArticles } from './useDeleteArticles';

export const DeleteArticles = (props: any) => {
  const { deleteModalOpen } = props;
  const { deleteArticles, closeArticleDeleteModal, deleteArticleStatus } =
    useDeleteArticles(props);

  return (
    <AlertModals
      type="delete"
      message="Do you want to delete the selected article?"
      open={deleteModalOpen}
      handleClose={() => closeArticleDeleteModal?.()}
      handleSubmitBtn={() => deleteArticles?.()}
      loading={deleteArticleStatus?.isLoading}
      disableCancelBtn={deleteArticleStatus?.isLoading}
    />
  );
};
