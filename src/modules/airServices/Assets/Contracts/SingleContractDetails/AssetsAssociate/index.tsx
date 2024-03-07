import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AssociationsImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { AssetsAssociateDetail } from './AssetsAssociateDetail';
import { useAssetAssociate } from './useAssetAssociate';

export const AssetsAssociate = () => {
  const {
    handleAddAssociateAsset,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    assetAssociatedData,
  } = useAssetAssociate();
  return (
    <>
      {!!assetAssociatedData?.length ? (
        <AssetsAssociateDetail
          assetsAssociateTableData={assetAssociatedData}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
        />
      ) : (
        <NoData
          message="There are no Asset Associations"
          image={AssociationsImage}
        >
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={handleAddAssociateAsset}
          >
            Associate Asset
          </Button>
        </NoData>
      )}
    </>
  );
};
