import { InventoryCard } from '@/components/Cards/InventoryCard/index';
import { useSoftware } from './useSoftware';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { Box } from '@mui/material';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RELATED_SOFTWARES,
      ]}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasNoData={!data?.data?.inventories?.length}
        hasError={isError}
        refreshApi={refetch}
        noDataMessage="No software found"
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
        }
      >
        {data?.data?.inventories?.map((singleSoftware: any) => (
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
        ))}
      </ApiRequestFlow>
    </PermissionsGuard>
  );
};
