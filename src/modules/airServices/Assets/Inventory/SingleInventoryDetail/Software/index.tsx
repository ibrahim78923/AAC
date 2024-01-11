import NoData from '@/components/NoData';
import { InventoryCard } from '@/components/InventoryCard/index';
import { ExpenseImage } from '@/assets/images';
import { useSoftware } from './useSoftware';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const Software = () => {
  const {
    AssetsInventorySoftwareData,
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    setDelateRecord,
  } = useSoftware();
  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {!!AssetsInventorySoftwareData?.length ? (
            AssetsInventorySoftwareData?.map((singleSoftware: any) => (
              <InventoryCard
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                handleDelete={handleDelete}
                setDelateRecord={setDelateRecord}
                deletedRecordId={singleSoftware?.inventorySoftwares?._id}
                heading={singleSoftware?.inventorySoftwares?.name}
                status={singleSoftware?.inventorySoftwares?.status}
                key={singleSoftware?.inventorySoftwares?._id}
              />
            ))
          ) : (
            <NoData image={ExpenseImage} message={'No Software found'} />
          )}
        </>
      )}
    </>
  );
};
