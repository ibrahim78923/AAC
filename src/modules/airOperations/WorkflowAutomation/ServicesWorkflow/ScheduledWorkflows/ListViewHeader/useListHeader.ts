import { useDeleteWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useListHeader = (props: any) => {
  const { selectedAction, setDeleteWorkflow, setSelectedAction } = props;
  const selectedId = selectedAction?.map((item: any) => item?._id);
  const [deleteTrigger] = useDeleteWorkflowMutation();
  const handleDelete = async () => {
    try {
      await deleteTrigger({ ids: selectedId });
      successSnackbar('Workflow deleted successfully');
      setDeleteWorkflow(false);
      setSelectedAction([]);
    } catch (err: any) {
      errorSnackbar();
    }
  };
  return {
    handleDelete,
  };
};
