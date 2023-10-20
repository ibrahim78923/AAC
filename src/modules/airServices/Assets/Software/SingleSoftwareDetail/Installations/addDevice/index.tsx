import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { Button } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import { useInstallation } from '../useInstallations';

const AddDevice = () => {
  const {
    handleAddDevice,
    addDeviceMethods: methods,
    isAddDeviceModalOpen,
    setIsAddDeviceModalOpen,
    onAddDeviceSubmit,
    addDeviceOptionsList: options,
  } = useInstallation();

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
          footer
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
          </FormProvider>
        </CommonModal>
      )}
    </>
  );
};

export default AddDevice;
