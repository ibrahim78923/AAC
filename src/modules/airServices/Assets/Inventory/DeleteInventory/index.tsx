import { AlertModals } from '@/components/AlertModals';
import { useDeleteInventory } from './useDeleteInventory';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { DeleteInventoryI } from './DeleteInventory.interface';

export const DeleteInventory: React.FC<DeleteInventoryI> = (props) => {
  const { deleteModalOpen } = props;
  const { deleteInventory, deleteInventoryStatus, closeInventoryDeleteModal } =
    useDeleteInventory(props);
  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete the selected inventory?"
      open={deleteModalOpen}
      handleClose={() => closeInventoryDeleteModal?.()}
      handleSubmitBtn={() => deleteInventory?.()}
      cancelBtnText="Cancel"
      loading={deleteInventoryStatus?.isLoading}
      disableCancelBtn={deleteInventoryStatus?.isLoading}
    />
  );
};
