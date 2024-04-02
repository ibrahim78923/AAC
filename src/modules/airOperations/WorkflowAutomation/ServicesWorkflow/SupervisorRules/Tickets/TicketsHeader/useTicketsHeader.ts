import { useDeleteWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useTicketsHeader = (props: any) => {
  const {
    selectedAction,
    setDeleteWorkflow,
    setSelectedAction,
    totalRecords,
    page,
    setPage,
    listData,
  } = props;

  const [deleteTrigger, deleteStatus] = useDeleteWorkflowMutation();
  const handleDelete = async () => {
    const deleteParams = selectedAction
      ?.map((item: any) => `ids=${item?._id}`)
      ?.join('&');
    try {
      await deleteTrigger(deleteParams);
      successSnackbar('Workflow deleted successfully');
      const newPage = selectedAction?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await listData?.(newPage);
      setDeleteWorkflow(false);
      setSelectedAction([]);
    } catch (err: any) {
      errorSnackbar();
    }
  };
  return {
    handleDelete,
    deleteStatus,
  };
};
