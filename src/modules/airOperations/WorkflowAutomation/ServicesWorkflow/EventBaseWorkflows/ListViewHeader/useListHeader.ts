import { useDeleteWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useListHeader = (props: any) => {
  const {
    selectedAction,
    setDeleteWorkflow,
    setSelectedAction,
    totalRecords,
    page,
    setPage,
  } = props;
  const [deleteTrigger, deleteStatus] = useDeleteWorkflowMutation();
  const handleDelete = async () => {
    const deleteParams = selectedAction
      ?.map((item: any) => `ids=${item?._id}`)
      ?.join('&');
    try {
      await deleteTrigger(deleteParams);
      successSnackbar('Workflow deleted successfully');
      setSelectedAction([]);
      const newPage = selectedAction?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      // await listData?.(newPage);
      setDeleteWorkflow(false);
    } catch (err: any) {
      errorSnackbar();
      setSelectedAction([]);
      setDeleteWorkflow(false);
    }
  };
  return {
    handleDelete,
    deleteStatus,
  };
};
