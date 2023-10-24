import { enqueueSnackbar } from 'notistack';
import { Header } from './components/Header';
import { SinglePurchaseOrderDetailTabs } from './components/SinglePurchaseOrderDetailTabs';
import { useSinglePurchaseDetail } from './useSinglePurchaseDetail';
import { AlertModals } from '@/components/AlertModals';

import { ReceivedItems } from './components/Header/ReceivedItems';
import { AddToInventoryDrawer } from './components/Header/AddToInventory';
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
          handleSubmit={() => {
            setIsDeleteModalOpen(false);
            enqueueSnackbar('Contract deleted Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure  want to delete this Contract ?"
        />
      )}
      <AddToInventoryDrawer
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
