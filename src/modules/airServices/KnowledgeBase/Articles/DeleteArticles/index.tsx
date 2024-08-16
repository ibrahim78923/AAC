import { AlertModals } from '@/components/AlertModals';
import { useDeleteArticles } from './useDeleteArticles';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { ArticlesPortalComponentPropsI } from '../Articles.interface';

export const DeleteArticles = (props: ArticlesPortalComponentPropsI | any) => {
  const { isPortalOpen } = props;
  const { deleteArticles, closeArticleDeleteModal, deleteArticleStatus } =
    useDeleteArticles(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Do you want to delete the selected article?"
      open={isPortalOpen?.isDelete as boolean}
      handleClose={() => closeArticleDeleteModal?.()}
      handleSubmitBtn={() => deleteArticles?.()}
      loading={deleteArticleStatus?.isLoading}
      disableCancelBtn={deleteArticleStatus?.isLoading}
    />
  );
};
