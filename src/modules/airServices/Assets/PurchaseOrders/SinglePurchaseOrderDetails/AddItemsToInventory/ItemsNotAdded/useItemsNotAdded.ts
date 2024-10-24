import { usePostAirServicesAssetsPurchaseOrderDetailsMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';

export const useItemsNotAdded = (props: any) => {
  const { isModalOpen, setIsModalOpen } = props;

  const router = useRouter();
  const { purchaseOrderId } = router?.query;

  const [postPurchaseOrderTrigger, postPurchaseOrderStatus] =
    usePostAirServicesAssetsPurchaseOrderDetailsMutation();

  const submitNewInventory = async () => {
    const addedInventoryList = isModalOpen?.formData?.inventoryData?.map(
      (inventory: any) => ({
        displayName: inventory?.displayName,
        purchaseOrderIds: [purchaseOrderId],
        locationId: inventory?.location?._id,
        departmentId: inventory?.department?._id,
      }),
    );
    const unReviewedInventoryItems = Array?.from(
      {
        length:
          +isModalOpen?.formData?.addedItemsCount -
          isModalOpen?.formData?.inventoryData?.length,
      },
      () => ({
        displayName: isModalOpen?.formData?.displayName,
        purchaseOrderIds: [purchaseOrderId],
        locationId: isModalOpen?.formData?.location?._id,
        departmentId: isModalOpen?.formData?.department?._id,
      }),
    );
    const sendInventoryItem = [
      ...addedInventoryList,
      ...unReviewedInventoryItems,
    ];
    const postPurchaseOrderParameter = {
      body: {
        purcahseId: purchaseOrderId,
        inventoryData: sendInventoryItem,
      },
    };

    try {
      await postPurchaseOrderTrigger(postPurchaseOrderParameter)?.unwrap();
      successSnackbar(
        `${sendInventoryItem?.length} item Added to Inventory Successfully`,
      );
      setIsModalOpen?.({});
      isModalOpen?.setIsDrawerOpen?.(false);
      isModalOpen?.reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen({});
  };

  return {
    closeModal,
    postPurchaseOrderStatus,
    submitNewInventory,
  };
};
