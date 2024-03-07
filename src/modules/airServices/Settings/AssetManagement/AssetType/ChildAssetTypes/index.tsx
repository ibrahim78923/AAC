import { AddBox } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import AddNewAssetTypesModal from '../AddNewAssetTypesModal';
import { useChildAssetTypes } from './useChildAssetTypes';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

const ChildAssetTypes = (props: any) => {
  const { children, boxShadow = 2 } = props;
  const {
    openAddNewChildModal,
    setOpenAddNewChildModal,
    palette,
    methods,
    handleSubmitServicesForm,
  } = useChildAssetTypes(props);

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      gap={1.8}
      borderRadius={3}
      py={2.4}
      px={'5%'}
      boxShadow={boxShadow}
      sx={{
        background: palette?.custom?.light_grayish_blue + 80,
      }}
    >
      {children}
      <Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_NEW_FIELDS_FOR_ASSET_FORM,
          ]}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 5 }}
            startIcon={<AddBox />}
            onClick={() => setOpenAddNewChildModal?.(true)}
          >
            Add New Services
          </Button>
        </PermissionsGuard>
      </Box>
      <AddNewAssetTypesModal
        open={openAddNewChildModal}
        handleClose={setOpenAddNewChildModal}
        modalTitle={'Add New Services'}
        methods={methods}
        handleSubmit={handleSubmitServicesForm}
      />
    </Box>
  );
};

export default ChildAssetTypes;
