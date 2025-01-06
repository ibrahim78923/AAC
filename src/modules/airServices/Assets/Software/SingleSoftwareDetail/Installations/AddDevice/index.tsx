import { FormProvider } from '@/components/ReactHookForm';
import { Button } from '@mui/material';
import { PlusSharedColorIcon } from '@/assets/icons';
import { useAddDevice } from './useAddDevice';
import GetSoftwareDevicesDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareDevicesDropdown';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
        <CustomCommonDialog
          isPortalOpen={isAddDeviceModalOpen}
          closePortal={handleCloseModal}
          dialogTitle="Add Device"
          submitButtonText="Add"
          showSubmitLoader={isLoading}
          disabledCancelButton={isLoading}
          handleSubmitButton={handleSubmit(onAddDeviceSubmit)}
        >
          <FormProvider methods={methods}>
            <GetSoftwareDevicesDropdown devicesQuery={devicesQuery} />
          </FormProvider>
        </CustomCommonDialog>
      )}
    </>
  );
};

export default AddDevice;
