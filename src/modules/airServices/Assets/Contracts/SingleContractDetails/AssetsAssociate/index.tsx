import TanstackTable from '@/components/Table/TanstackTable';
import { useAssetAssociate } from './useAssetAssociate';
import { assetsAssociateColumns } from './AssetsAssociate.data';

export const AssetsAssociate = () => {
  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    associatedAssetArray,
    refetch,
  } = useAssetAssociate();
  return (
    <>
      <TanstackTable
        data={associatedAssetArray}
        columns={assetsAssociateColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        errorProps={{ canRefresh: true, refresh: refetch }}
      />
    </>
  );
};
