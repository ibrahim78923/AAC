import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import { useAddDevice } from './useAddDevice';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const AddDevice = () => {
  const {
    handleAddDevice,
    addDeviceMethods: methods,
    isAddDeviceModalOpen,
    handleCloseModal,
    onAddDeviceSubmit,
    devicesQuery,
    isLoading,
  } = useAddDevice();

  return (
    <>
      <Button
        color="secondary"
        onClick={handleAddDevice}
        sx={{ px: 2 }}
        startIcon={<GrayPlusIcon />}
      >
        Add Device
      </Button>
      {isAddDeviceModalOpen && (
        <Dialog
          open={isAddDeviceModalOpen}
          onClose={handleCloseModal}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                p: 2,
                borderRadius: 5,
              },
            },
          }}
          fullWidth
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h3">Add Device</Typography>
            <Close
              color="secondary"
              sx={{ cursor: 'pointer' }}
              onClick={handleCloseModal}
            />
          </Box>
          <FormProvider
            methods={methods}
            onSubmit={methods?.handleSubmit(onAddDeviceSubmit)}
          >
            <RHFAutocompleteAsync
              name="device"
              placeholder="Search or add category"
              size="small"
              label="Device"
              required={true}
              apiQuery={devicesQuery}
              getOptionLabel={(option: any) => option?.displayName}
            />
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
              >
                Add
              </LoadingButton>
            </Box>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};

export default AddDevice;
