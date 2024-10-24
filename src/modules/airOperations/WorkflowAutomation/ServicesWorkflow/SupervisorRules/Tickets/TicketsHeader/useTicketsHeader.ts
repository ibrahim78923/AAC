import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { WorkflowListHeaderI } from '@/types/modules/AirOperations/WorkflowAutomation';

export const useTicketsHeader = (props: WorkflowListHeaderI) => {
  const {
    selectedAction,
    setDeleteWorkflow,
    setSelectedAction,
    totalRecords,
    page,
    setPage,
    setSearch,
  } = props;

  const [deleteTrigger, deleteStatus] = useDeleteServicesWorkflowMutation();
  const handleDelete = async () => {
    const deleteParams = selectedAction
      ?.map((item: any) => `ids=${item?._id}`)
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

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };
  return {
    handleDelete,
    deleteStatus,
    handleSearch,
  };
};
