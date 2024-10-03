import { useDeleteAirServicesSettingsCannedAddResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useDeleteResponseModal({
  selectedData,
  setSelectedData,
  setDeleteModal,
}: any) {
  const [deleteResponsesTrigger, { isLoading }] =
    useDeleteAirServicesSettingsCannedAddResponsesMutation();

  const deleteResponses = async () => {
    const deleteParams = new URLSearchParams();
    selectedData?.forEach(
      (item: any) => deleteParams?.append('ids', item?._id),
    );
    const deleteResponsesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteResponsesTrigger(deleteResponsesParameter)?.unwrap();
      successSnackbar('Deleted successfully!');
      setSelectedData([]);
      setDeleteModal(false);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      setDeleteModal(false);
    }
  };

  return { deleteResponses, isLoading };
}
