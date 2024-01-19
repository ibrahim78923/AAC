import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { enqueueSnackbar } from 'notistack';
export const DeleteResponseModal = ({
  deleteModal,
  setDeleteModal,
  setSelectedData,
  selectedData,
}: any) => {
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
      const response: any = await deleteResponsesTrigger(
        deleteResponsesParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Deleted successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedData([]);
      setDeleteModal(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setDeleteModal(false);
    }
  };
  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={deleteResponses}
        loading={isLoading}
      />
    </>
  );
};
