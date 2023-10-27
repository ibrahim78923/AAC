import { enqueueSnackbar } from 'notistack';
import { Header } from './Header';
import { useSinglePurchaseDetail } from './useSinglePurchaseDetail';
import { AlertModals } from '@/components/AlertModals';

import { ReceivedItems } from './ReceivedItems';
import { AddToInventory } from './AddToInventory';
import { SinglePurchaseOrderDetailTabs } from './SinglePurchaseOrderDetailTabs';
export const SinglePurchaseOrderDetail = () => {
  const {
    singlePurchaseDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
  }: any = useSinglePurchaseDetail();
  return (
    <>
      <>
        <Header
          dropdownOptions={singlePurchaseDetailActionDropdown}
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
          handleSubmitBtn={() => {
            setIsDeleteModalOpen(false);
            enqueueSnackbar('Contract deleted Successfully', {
              variant: 'success',
            });
          }}
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
