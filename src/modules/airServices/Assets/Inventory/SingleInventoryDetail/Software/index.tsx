import NoData from '@/components/NoData';
import { InventoryCard } from '@/components/InventoryCard/index';
import { ExpenseImage } from '@/assets/images';
import { useSoftware } from './useSoftware';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

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
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RELATED_SOFTWARES,
        ]}
      >
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
      </PermissionsGuard>
    </>
  );
};
