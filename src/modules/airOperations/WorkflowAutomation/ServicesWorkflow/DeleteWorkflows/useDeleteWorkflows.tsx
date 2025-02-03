import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';

export const useDeleteWorkflows = (props: any) => {
  const {
    setDeleteWorkflow,
    setSelectedAction,
    selectedAction,
    totalRecords,
    page,
    setPage,
  } = props;

  const [deleteServicesWorkflowTrigger, { isLoading }] =
    useDeleteServicesWorkflowMutation();

  const closeModal = () => {
    setDeleteWorkflow?.(false);
    setSelectedAction?.([]);
  };

  const refetch = () => {
    const newPage =
      selectedAction?.length === totalRecords ? PAGINATION?.CURRENT_PAGE : page;
    setPage?.(newPage);
  };

  const handleDelete = async () => {
    const deleteParams = selectedAction
      ?.map((item: any) => `ids=${item?._id}`)
      ?.join('&');

    try {
      await deleteServicesWorkflowTrigger(deleteParams);
      successSnackbar('Workflow deleted successfully');
      closeModal();
      refetch();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleDelete,
    isLoading,
    closeModal,
  };
};
