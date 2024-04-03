import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteResponsesMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/utils/api';
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
      await deleteResponsesTrigger(deleteResponsesParameter)?.unwrap();
      successSnackbar('Deleted successfully!');
      setSelectedData([]);
      setDeleteModal(false);
    } catch (error: any) {
      errorSnackbar();
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
