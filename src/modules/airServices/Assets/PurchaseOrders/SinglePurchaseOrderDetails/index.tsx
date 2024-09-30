import { Header } from './Header';
import { useSinglePurchaseDetail } from './useSinglePurchaseDetail';
import { ReceivedItems } from './ReceivedItems';
import { SinglePurchaseOrderDetailTabs } from './SinglePurchaseOrderDetailTabs';
import { DeletePurchaseOrder } from '../DeletePurchaseOrder';
import { AddItemsToInventory } from './AddItemsToInventory';

export const SinglePurchaseOrderDetail = () => {
  const {
    singlePurchaseDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
    singlePurchaseDetailStatusDropdown,
    purchaseOrderId,
  }: any = useSinglePurchaseDetail();

  return (
    <>
      <Header
        dropdownOptions={singlePurchaseDetailActionDropdown}
        statusDropdownOptions={singlePurchaseDetailStatusDropdown}
        handleReceived={() => setIsADrawerOpen(true)}
        handleAddToInventory={() => setIsDrawerOpen(true)}
      />

      <SinglePurchaseOrderDetailTabs />

      {isDeleteModalOpen && (
        <DeletePurchaseOrder
          deleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setIsDeleteModalOpen}
          purchaseOrderData={[{ _id: purchaseOrderId }]}
          canMoveBack
        />
      )}

      {isDrawerOpen && (
        <AddItemsToInventory
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}

      {isADrawerOpen && (
        <ReceivedItems
          isDrawerOpen={isADrawerOpen}
          setIsDrawerOpen={setIsADrawerOpen}
        />
      )}
    </>
  );
};
