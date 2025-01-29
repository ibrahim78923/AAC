import { useDeleteAirServicesSettingsCannedAddResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { PAGINATION } from '@/config';

export default function useDeleteResponseModal(props: any) {
  const {
    selectedData,
    setSelectedData,
    setIsPortalOpen,
    totalRecords,
    getResponseList,
    page,
    setPage,
  } = props;

  const [deleteResponsesTrigger, { isLoading }] =
    useDeleteAirServicesSettingsCannedAddResponsesMutation();

  const refetchApi = async () => {
    const newPage =
      selectedData?.length === totalRecords ? PAGINATION?.CURRENT_PAGE : page;
    setPage?.(newPage);
    await getResponseList?.(newPage);
  };

  const closeModal = () => {
    setSelectedData([]);
    setIsPortalOpen({ isOpen: false, action: '' });
  };

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
      closeModal?.();
      await refetchApi?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return { deleteResponses, isLoading, closeModal };
}
