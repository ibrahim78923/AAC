import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { associationsImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { assetsAssociateTableData } from './AssetsAssociateDetail/AssetsAssociateTable/AssetsAssociateTable.data';
import { AssetsAssociateDetail } from './AssetsAssociateDetail';
import { useAssetAssociate } from './useAssetAssociate';

export const AssetsAssociate = () => {
  const { handleAddAssociateAsset } = useAssetAssociate();
  return (
    <>
      {!!assetsAssociateTableData?.length ? (
        <AssetsAssociateDetail />
      ) : (
        <NoData
          message="There are no Asset Associations"
          image={associationsImage}
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
