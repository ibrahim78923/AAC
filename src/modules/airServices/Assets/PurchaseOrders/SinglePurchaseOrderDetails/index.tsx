import { Header } from './Header';
import { useSinglePurchaseDetail } from './useSinglePurchaseDetail';
import { AlertModals } from '@/components/AlertModals';

import { ReceivedItems } from './ReceivedItems';
import { AddToInventory } from './AddToInventory';
import { SinglePurchaseOrderDetailTabs } from './SinglePurchaseOrderDetailTabs';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';
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
    deletePurchaseOrder,
    isLoading,
  }: any = useSinglePurchaseDetail();
  return (
    <>
      <>
        <Header
          dropdownOptions={singlePurchaseDetailActionDropdown}
          statusDropdownOptions={singlePurchaseDetailStatusDropdown}
          currentStatus={PURCHASE_ORDER_STATUS?.OPEN}
          handleReceived={() => setIsADrawerOpen(true)}
          handleAddToInventory={() => setIsDrawerOpen(true)}
        />
      </>
      <SinglePurchaseOrderDetailTabs />
      {isDeleteModalOpen && (
        <AlertModals
          type="delete"
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          handleSubmitBtn={deletePurchaseOrder}
          loading={isLoading}
          message="Are you sure  want to delete this purchase order ?"
        />
      )}

      <AddToInventory
        isADrawerOpen={isDrawerOpen}
        setIsADrawerOpen={setIsDrawerOpen}
      />
      <ReceivedItems
        isDrawerOpen={isADrawerOpen}
        setIsDrawerOpen={setIsADrawerOpen}
      />
    </>
  );
};
