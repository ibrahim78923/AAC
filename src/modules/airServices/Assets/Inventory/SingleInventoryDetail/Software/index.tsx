import NoData from '@/components/NoData';
import { InventoryCard } from '@/components/InventoryCard/index';
import { ExpenseImage } from '@/assets/images';
import { useSoftware } from './useSoftware';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import ApiErrorState from '@/components/ApiErrorState';

export const Software = () => {
  const {
    isLoading,
    isFetching,
    isError,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    setDelateRecord,
    data,
    deleteIsLoading,
  } = useSoftware();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RELATED_SOFTWARES,
      ]}
    >
      {!!data?.data?.inventories?.length ? (
        data?.data?.inventories?.map((singleSoftware: any) => (
          <div key={singleSoftware?.inventorySoftwares?._id}>
            <InventoryCard
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              handleDelete={handleDelete}
              setDelateRecord={setDelateRecord}
              deletedRecordId={singleSoftware?.inventorySoftwares?._id}
              heading={singleSoftware?.inventorySoftwares?.name}
              status={singleSoftware?.inventorySoftwares?.status}
              key={singleSoftware?.inventorySoftwares?._id}
              deleteIsLoading={deleteIsLoading?.isLoading}
            />
          </div>
        ))
      ) : (
        <NoData image={ExpenseImage} message={'No Software found'} />
      )}
    </PermissionsGuard>
  );
};
