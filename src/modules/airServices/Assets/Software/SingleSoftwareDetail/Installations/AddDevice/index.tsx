import { FormProvider } from '@/components/ReactHookForm';
import { useAddDevice } from './useAddDevice';
import GetSoftwareDevicesDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareDevicesDropdown';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { AddDevicesPropsI } from '../Installations.interface';

const AddDevice = (props: AddDevicesPropsI) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleCloseModal,
    onAddDeviceSubmit,
    isLoading,
    handleSubmit,
  } = useAddDevice(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isPortalOpen?.isOpen}
        closePortal={handleCloseModal}
        dialogTitle="Add Device"
        submitButtonText="Add"
        showSubmitLoader={isLoading}
        disabledCancelButton={isLoading}
        handleSubmitButton={handleSubmit(onAddDeviceSubmit)}
      >
        <FormProvider methods={methods}>
          <GetSoftwareDevicesDropdown />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};

export default AddDevice;
