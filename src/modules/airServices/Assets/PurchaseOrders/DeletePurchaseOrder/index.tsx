import { AlertModals } from '@/components/AlertModals';
import { useDeletePurchaseOrder } from './useDeletePurchaseOrder';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { Button } from '@mui/material';

export const DeletePurchaseOrder = (props: any) => {
  const { deleteModalOpen, setDeleteModalOpen, isDisabled = true } = props;
  const { deletePurchaseOrder } = useDeletePurchaseOrder(props);

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => setDeleteModalOpen(true)}
        disabled={isDisabled}
      >
        Delete
      </Button>
      {deleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          message="Are you sure you want to delete the selected purchase order?"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen?.(false)}
          handleSubmitBtn={() => deletePurchaseOrder?.()}
        />
      )}
    </>
  );
};
