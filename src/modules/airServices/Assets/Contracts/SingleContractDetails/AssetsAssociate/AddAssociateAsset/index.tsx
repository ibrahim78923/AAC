import { Box, Button, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  addAssociateAssetData,
  addAssociateAssetColumns,
} from './AddAssociateAsset.data';
import { useAddAssetAssociate } from './useAddAssetAssociate';
import { styles } from './AddAssociateAsset.style';

export const AddAssociateAsset = () => {
  const {
    activeCheck,
    setActiveCheck,
    handleAllocateClick,
    handleCancelBtn,
    theme,
  } = useAddAssetAssociate();
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
          data={addAssociateAssetData}
          columns={addAssociateAssetColumns(activeCheck, setActiveCheck)}
        />
      </Box>
      <br />
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'flex-end'}
        gap={1}
      >
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
