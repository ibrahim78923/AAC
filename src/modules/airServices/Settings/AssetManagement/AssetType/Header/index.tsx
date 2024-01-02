import { AIR_SERVICES } from '@/constants';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import AddNewAssetTypesModal from '../AddNewAssetTypesModal';
import { useHeader } from './useHeader';

const Header = () => {
  const {
    router,
    handleSubmitAddForm,
    methods,
    openAddNewAssetTypesModal,
    setOpenAddNewAssetTypesModal,
    isLoading,
  } = useHeader();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          <ArrowBack
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              router?.push({
                pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
              });
            }}
          />
          <Typography variant="h3" textTransform="capitalize">
            asset type & fields
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setOpenAddNewAssetTypesModal?.(true)}
        >
          New Asset Type
        </Button>
      </Box>
      <Box>
        <AddNewAssetTypesModal
          open={openAddNewAssetTypesModal}
          handleClose={setOpenAddNewAssetTypesModal}
          methods={methods}
          handleSubmit={handleSubmitAddForm}
          isLoading={isLoading}
          modalTitle="Add New Asset Type"
        />
      </Box>
    </>
  );
};

export default Header;
