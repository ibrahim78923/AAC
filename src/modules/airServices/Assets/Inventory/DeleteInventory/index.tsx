import { AlertModals } from '@/components/AlertModals';
import { useDeleteInventory } from './useDeleteInventory';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteInventory = (props: any) => {
  const { deleteModalOpen, setDeleteModalOpen } = props;
  const { deleteInventory } = useDeleteInventory(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete the selected inventory?"
      open={deleteModalOpen}
      handleClose={() => setDeleteModalOpen?.(false)}
      handleSubmitBtn={() => deleteInventory?.()}
    />
  );
};
