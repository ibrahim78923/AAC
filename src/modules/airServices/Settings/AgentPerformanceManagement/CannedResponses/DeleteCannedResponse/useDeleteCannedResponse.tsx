import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteAirServicesSettingsCannedResponseMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useDeleteCannedResponse = (props: any) => {
  const { isPortalOpen, setIsPortalOpen } = props;

  const [deleteCannedResponseTrigger, { isLoading }] =
    useDeleteAirServicesSettingsCannedResponseMutation();

  const closeModal = () =>
    setIsPortalOpen({ open: false, delete: false, editData: null });

  const deleteCannedResponse = async () => {
    const deleteParams = new URLSearchParams();

    deleteParams?.append('id', isPortalOpen?.editData?._id);

    const deleteCannedResponseParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteCannedResponseTrigger(
        deleteCannedResponseParameter,
      )?.unwrap();
      successSnackbar('Folder deleted successfully');
      closeModal?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    isLoading,
    deleteCannedResponse,
    closeModal,
  };
};
