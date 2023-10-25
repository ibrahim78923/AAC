import { Box, Button, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  AddAssociateTableAssetsData,
  AddAssociateAssetsTableColumns,
} from './AddAssociateAsset.data';
import { useAssetAssociate } from '../useAssetAssociate';
import { styles } from '../AssetAssociate.style';

export const AddAssociateAsset = () => {
  const {
    activeCheck,
    setActiveCheck,
    handleAllocateClick,
    handleCancelBtn,
    theme,
  } = useAssetAssociate();
  return (
    <>
      <Typography variant="h3">Associated Assets</Typography>
      <br />
      <br />
      <Box sx={styles.addAssetContainer(theme)}>
        <Box p={'12px 24px'}>
          <Search placeholder="Search Here" />
        </Box>
        <TanstackTable
          data={AddAssociateTableAssetsData}
          columns={AddAssociateAssetsTableColumns(activeCheck, setActiveCheck)}
        />
      </Box>
      <br />
      <Box sx={styles.addAssetBtn}>
        <Button variant="outlined" color="secondary" onClick={handleCancelBtn}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!activeCheck.length}
          onClick={handleAllocateClick}
        >
          Allocate
        </Button>
      </Box>
    </>
  );
};
