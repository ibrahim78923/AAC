import { Header } from './Header';
import { useSingleInventoryDetail } from './useSingleInventoryDetail';
import { SingleInventoryDetailsTabs } from './SingleInventoryDetailTabs';
import { DeleteInventory } from '../DeleteInventory';

export const SingleInventoryDetail = () => {
  const {
    singleInventoryDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    inventoryData,
    isFetching,
    isLoading,
    inventoryId,
  }: any = useSingleInventoryDetail();

  return (
    <>
      <Header
        inventoryData={inventoryData}
        isFetching={isFetching}
        isLoading={isLoading}
        dropdownOptions={singleInventoryDetailActionDropdown}
      />
      <br />

      <SingleInventoryDetailsTabs />

      {isDeleteModalOpen && (
        <DeleteInventory
          deleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setIsDeleteModalOpen}
          selectedInventoryLists={[inventoryId]}
          isMoveBack
        />
      )}
    </>
  );
};
