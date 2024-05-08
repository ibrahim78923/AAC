import { AlertModals } from '@/components/AlertModals';
import { useDeleteShop } from './useDeleteShop';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteShop = (props: any) => {
  const { isPortalOpen } = props;

  const { handleDeleteShop, closeDeleteModal, deleteShopStatus } =
    useDeleteShop(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="This action is irreversible. Are you sure you want to delete this?"
      open={isPortalOpen?.isOpen}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => handleDeleteShop?.()}
      loading={deleteShopStatus?.isLoading}
      disableCancelBtn={deleteShopStatus?.isLoading}
    />
  );
};
