import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AlertModals } from '@/components/AlertModals';
import { useAssetAssociate } from '../../useAssetAssociate';
import { styles } from '../../AssetAssociate.style';

export const AssetsAssociateHeader = ({ activeCheck }: any) => {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    handleAddAssociateAsset,
  } = useAssetAssociate();
  return (
    <>
      <Box sx={styles.assetsAssociateHead}>
        <Button
          color="secondary"
          variant="outlined"
          disabled={!!!activeCheck.length}
          onClick={() => setOpenDeleteModal(true)}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={handleAddAssociateAsset}
        >
          Associate Asset
        </Button>
      </Box>
      <AlertModals
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        type="delete"
        handleSubmit={handleDeleteSubmit}
        message="Are you sure want to delete Asset?"
      />
    </>
  );
};
