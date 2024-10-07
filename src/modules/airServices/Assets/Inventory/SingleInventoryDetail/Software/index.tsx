import NoData from '@/components/NoData';
import { InventoryCard } from '@/components/InventoryCard/index';
import { useSoftware } from './useSoftware';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import ApiErrorState from '@/components/ApiErrorState';
import { Box } from '@mui/material';

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
    refetch,
  } = useSoftware();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RELATED_SOFTWARES,
      ]}
    >
      {!!data?.data?.inventories?.length ? (
        data?.data?.inventories?.map((singleSoftware: any) => (
          <Box key={singleSoftware?.inventorySoftwares?._id}>
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
          </Box>
        ))
      ) : (
        <NoData message={'No Software found'} />
      )}
    </PermissionsGuard>
  );
};
