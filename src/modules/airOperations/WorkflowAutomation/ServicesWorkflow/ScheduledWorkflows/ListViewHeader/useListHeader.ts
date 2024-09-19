import { useDeleteServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { WorkflowListHeaderI } from '@/types/modules/AirOperations/WorkflowAutomation';

export const useListHeader = (props: WorkflowListHeaderI) => {
  const {
    selectedAction,
    setDeleteWorkflow,
    setSelectedAction,
    totalRecords,
    page,
    setPage,
  } = props;
  const [deleteTrigger, deleteStatus] = useDeleteServicesWorkflowMutation();
  const handleDelete = async () => {
    const deleteParams = selectedAction
      ?.map((item) => `ids=${item?._id}`)
      ?.join('&');
    try {
      await deleteTrigger(deleteParams);
      successSnackbar('Workflow deleted successfully');
      const newPage = selectedAction?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
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
