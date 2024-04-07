import { AlertModals } from '@/components/AlertModals';
import { useItemsNotAdded } from './useItemsNotAdded';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const ItemsNotAdded = (props: any) => {
  const { isModalOpen } = props;
  const { closeModal, postPurchaseOrderStatus, submitNewInventory } =
    useItemsNotAdded?.(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.WARNING}
      message={`Are you sure you want to submit. There are still ${
        +isModalOpen?.formData?.addedItemsCount -
        isModalOpen?.formData?.inventoryData?.length
      } item left for review?`}
      open={isModalOpen?.isOpen}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => submitNewInventory?.()}
      loading={postPurchaseOrderStatus?.isLoading}
      disableCancelBtn={postPurchaseOrderStatus?.isLoading}
    />
  );
};
