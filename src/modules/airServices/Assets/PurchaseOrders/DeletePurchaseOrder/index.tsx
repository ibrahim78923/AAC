import { AlertModals } from '@/components/AlertModals';
import { useDeletePurchaseOrder } from './useDeletePurchaseOrder';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeletePurchaseOrder = (props: any) => {
  const { deleteModalOpen } = props;
  const {
    deletePurchaseOrder,
    deletePurchaseOrderStatus,
    closePurchaseOrderDeleteModal,
  } = useDeletePurchaseOrder(props);

  return (
    <>
      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        message="Are you sure you want to delete the selected purchase order?"
        open={deleteModalOpen}
        handleClose={() => closePurchaseOrderDeleteModal?.()}
        handleSubmitBtn={() => deletePurchaseOrder?.()}
        loading={deletePurchaseOrderStatus?.isLoading}
        disableCancelBtn={deletePurchaseOrderStatus?.isLoading}
      />
    </>
  );
};
