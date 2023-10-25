import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { associationsImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { AssetsAssociateTableData } from './AssetsAssociateDetail/AssetsAssociateTable/AssetsAssociate.data';
import { AssetsAssociateDetail } from './AssetsAssociateDetail';
import { useAssetAssociate } from './useAssetAssociate';

export const AssetsAssociate = () => {
  const { handleAddAssociateAsset } = useAssetAssociate();
  return (
    <>
      {!!AssetsAssociateTableData?.length ? (
        <AssetsAssociateDetail />
      ) : (
        <NoData
          message="There are no Asset associations"
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
