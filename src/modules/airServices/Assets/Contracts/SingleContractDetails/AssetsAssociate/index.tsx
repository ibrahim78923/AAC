import { AssetsAssociateDetail } from './AssetsAssociateDetail';
import { useAssetAssociate } from './useAssetAssociate';

export const AssetsAssociate = () => {
  const { isLoading, isFetching, isError, isSuccess, associatedAssetArray } =
    useAssetAssociate();
  return (
    <>
      <AssetsAssociateDetail
        assetsAssociateTableData={associatedAssetArray}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
      />
    </>
  );
};
