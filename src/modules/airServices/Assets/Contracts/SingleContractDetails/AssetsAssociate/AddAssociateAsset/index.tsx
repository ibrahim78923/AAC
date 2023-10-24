import { Box, Button, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  AddAssociateTableAssetsData,
  AddAssociateAssetsTableColumns,
} from './AddAssociteAsset.data';
import { useAssetAssociate } from '../useAssetAssociate';

export const AddAssociateAsset = () => {
  const { activeCheck, setActiveCheck, handleAllocateClick, router, theme } =
    useAssetAssociate();
  return (
    <>
      <Typography variant="h3">Associated Assets</Typography>
      <br />
      <br />
      <Box
        sx={{
          boxShadow:
            '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
          border: `1px solid ${theme.palette.custom.off_white_three}`,
          borderRadius: '8px',
        }}
      >
        <Box p={'12px 24px'}>
          <Search placeholder="Search Here" />
        </Box>
        <TanstackTable
          data={AddAssociateTableAssetsData}
          columns={AddAssociateAssetsTableColumns(activeCheck, setActiveCheck)}
        />
      </Box>
      <br />
      <Box
        display={'flex'}
        gap={1}
        flexWrap={'wrap'}
        justifyContent={'flex-end'}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            router.push({
              pathname: '/air-services/assets/contracts/detail',
            })
          }
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={!activeCheck.length}
          onClick={handleAllocateClick}
        >
          Allocate
        </Button>
      </Box>
    </>
  );
};
