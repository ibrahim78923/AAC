import { useDeleteResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useDeleteResponseModal({
  selectedData,
  setSelectedData,
  setDeleteModal,
}: any) {
  const [deleteResponsesTrigger, { isLoading }] = useDeleteResponsesMutation();
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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModal(false);
    }
  };

  return { deleteResponses, isLoading };
}
