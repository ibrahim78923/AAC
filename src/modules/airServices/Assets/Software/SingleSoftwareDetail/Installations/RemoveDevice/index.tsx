import { AlertModals } from '@/components/AlertModals';
import { useRemoveDevice } from './useRemoveDevice';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { RemoveDevicesPropsI } from '../Installations.interface';

export const RemoveDevice = (props: RemoveDevicesPropsI) => {
  const { isPortalOpen } = props;
  const { isLoading, closeModal, submitDeleteModal } = useRemoveDevice(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      open={isPortalOpen?.isOpen}
      message="Are you sure you want to delete selected device?"
      handleClose={closeModal}
      handleSubmitBtn={submitDeleteModal}
      loading={isLoading}
      disableCancelBtn={isLoading}
    />
  );
};
