import TanstackTable from '@/components/Table/TanstackTable';
import { useAssetAssociate } from './useAssetAssociate';
import { assetsAssociateColumns } from './AssetsAssociate.data';

export const AssetsAssociate = () => {
  const { isLoading, isFetching, isError, isSuccess, associatedAssetArray } =
    useAssetAssociate();
  return (
    <>
      <br />
      <TanstackTable
        data={associatedAssetArray}
        columns={assetsAssociateColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
      />
    </>
  );
};
