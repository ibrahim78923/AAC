import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteLocations } from './useDeleteLocations';

export const DeleteLocations = (props: any) => {
  const { isPortalOpen } = props;
  const {
    deleteMeetingsLocation,
    closeDeleteModal,
    deleteCommonMeetingsLocationsStatus,
  }: any = useDeleteLocations(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this entry?"
      open={isPortalOpen?.isDelete}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => deleteMeetingsLocation?.()}
      loading={deleteCommonMeetingsLocationsStatus?.isLoading}
      disableCancelBtn={deleteCommonMeetingsLocationsStatus?.isLoading}
    />
  );
};
