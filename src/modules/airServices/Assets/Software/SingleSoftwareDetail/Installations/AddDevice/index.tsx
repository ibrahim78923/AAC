import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { Box, Button, Divider } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import { useAddDevice } from './useAddDevice';

const AddDevice = () => {
  const {
    handleAddDevice,
    addDeviceMethods: methods,
    isAddDeviceModalOpen,
    setIsAddDeviceModalOpen,
    onAddDeviceSubmit,
    addDeviceOptionsList: options,
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
        <CommonModal
          open={isAddDeviceModalOpen}
          handleClose={() => setIsAddDeviceModalOpen(false)}
          handleSubmit={methods?.handleSubmit(onAddDeviceSubmit)}
          title="Add Device"
          okText="add"
          footerFill={'auto'}
        >
          <FormProvider
            methods={methods}
            onSubmit={methods?.handleSubmit(onAddDeviceSubmit)}
          >
            <RHFSelect
              name="device"
              placeholder="Search or add category"
              size="small"
              label="Device"
            >
              {options?.map(({ value, label }: any) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </RHFSelect>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                onClick={() => methods.reset()}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                save
              </Button>
            </Box>
          </FormProvider>
        </CommonModal>
      )}
    </>
  );
};

export default AddDevice;
