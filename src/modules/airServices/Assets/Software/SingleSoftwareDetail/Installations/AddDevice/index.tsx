import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { PlusSharedColorIcon } from '@/assets/icons';
import { useAddDevice } from './useAddDevice';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import GetSoftwareDevicesDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareDevicesDropdown';

const AddDevice = () => {
  const {
    handleAddDevice,
    methods,
    isAddDeviceModalOpen,
    handleCloseModal,
    onAddDeviceSubmit,
    devicesQuery,
    isLoading,
    handleSubmit,
  } = useAddDevice();

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={handleAddDevice}
        sx={{ px: 2 }}
        startIcon={<PlusSharedColorIcon />}
        className="small"
      >
        Add Device
      </Button>
      {isAddDeviceModalOpen && (
        <Dialog
          open={isAddDeviceModalOpen}
          onClose={handleCloseModal}
          fullWidth
        >
          <DialogTitle>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={1}
              mb={-1.5}
              flexWrap={'wrap'}
            >
              <Typography variant="h3">Add Device</Typography>
              <IconButton onClick={handleCloseModal}>
                <Close color="secondary" />
              </IconButton>
            </Box>
          </DialogTitle>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onAddDeviceSubmit)}
          >
            <DialogContent>
              <GetSoftwareDevicesDropdown devicesQuery={devicesQuery} />
            </DialogContent>
            <DialogActions sx={{ paddingTop: `0rem !important` }}>
              <LoadingButton
                onClick={handleCloseModal}
                variant="outlined"
                color="secondary"
                disabled={isLoading}
                className="small"
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                variant="contained"
                className="small"
              >
                Add
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};

export default AddDevice;
