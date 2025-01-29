import { Typography } from '@mui/material';
import { InventoryCard } from '@/components/Cards/InventoryCard/index';
import { useContract } from './useContract';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const Contract = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
    deleteIsLoading,
    refetch,
  } = useContract();

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_CONTRACTS,
      ]}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasNoData={!data?.data?.length}
        hasError={isError}
        refreshApi={refetch}
        noDataMessage="There are no active contract available"
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
        }
      >
        {data?.data?.map((singleContract: any) => (
          <InventoryCard
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            handleDelete={handleDelete}
            setDelateRecord={setDelateRecord}
            deletedRecordId={singleContract?._id}
            heading={singleContract?.name}
            status={singleContract?.status}
            key={singleContract?._id}
            deleteIsLoading={deleteIsLoading?.isLoading}
            showChild
          >
            <Typography
              variant={'body1'}
              color={theme?.palette?.grey?.[900]}
              textTransform={'capitalize'}
            >
              {singleContract?.contractTypeDetails?.name?.toLowerCase()}
            </Typography>
          </InventoryCard>
        ))}
      </ApiRequestFlow>
    </PermissionsGuard>
  );
};
