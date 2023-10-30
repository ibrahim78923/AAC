import { Box, Button, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { addAssociateAssetData } from './AddAssociateAsset.data';
import { useAddAssociateAsset } from './useAddAssociateAsset';

export const AddAssociateAsset = () => {
  const {
    activeCheck,
    handleAllocateClick,
    handleCancelBtn,
    tableColumns,
    theme,
  } = useAddAssociateAsset();
  return (
    <>
      <Typography variant="h3">Associated Assets</Typography>
      <br />
      <br />
      <Box
        boxShadow={
          '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)'
        }
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
        borderRadius={'8px'}
      >
        <Box p={'12px 24px'}>
          <Search placeholder="Search Here" />
        </Box>
        <TanstackTable data={addAssociateAssetData} columns={tableColumns} />
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
          disabled={!activeCheck?.length}
          onClick={handleAllocateClick}
        >
          Allocate
        </Button>
      </Box>
    </>
  );
};
