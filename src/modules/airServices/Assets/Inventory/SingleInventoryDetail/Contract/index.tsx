import NoData from '@/components/NoData';
import { Typography } from '@mui/material';
import { InventoryCard } from '@/components/InventoryCard/index';
import { ContractImage } from '@/assets/images';
import { useContract } from './useContract';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import ApiErrorState from '@/components/ApiErrorState';

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
  } = useContract();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_CONTRACTS,
      ]}
    >
      {!!data?.data?.length ? (
        data?.data?.map((singleContract: any) => (
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
            <Typography color={theme?.palette?.grey?.[900]}>
              {singleContract?.contractType}
            </Typography>
          </InventoryCard>
        ))
      ) : (
        <NoData
          image={ContractImage}
          message={'There are no active contract available'}
        />
      )}
    </PermissionsGuard>
  );
};
