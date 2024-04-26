import { AlertModals } from '@/components/AlertModals';
import { useDeleteShop } from './useDeleteShop';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteShop = (props: any) => {
  const { deleteModalOpen, setDeleteModalOpen } = props;
  const { handleDeleteShop } = useDeleteShop(props);

  return (
    <>
      {deleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          message="This action is irreversible. Are you sure you want to delete this?"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen?.(false)}
          handleSubmitBtn={() => handleDeleteShop?.()}
        />
      )}
    </>
  );
};
