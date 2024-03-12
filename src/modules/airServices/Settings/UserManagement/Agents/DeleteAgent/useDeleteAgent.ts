import { useDeleteAgentMutation } from '@/services/airServices/settings/user-management/agents';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteAgent = (props: any) => {
  const {
    selectedAgentList,
    setSelectedAgentList,
    getAgentsListData,
    page,
    setOpenDeleteModal,
    setPage,
    totalRecords,
  } = props;

  const [deleteAgentTrigger, deleteAgentStatus] = useDeleteAgentMutation();
  const deleteAgent = async () => {
    const deleteParams = new URLSearchParams();
    selectedAgentList?.forEach((id: any) => deleteParams?.append('ids', id));
    const deleteArticlesParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteAgentTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Agent deleted successfully');
      setSelectedAgentList?.([]);
      setPage?.(selectedAgentList?.length === totalRecords ? 1 : page);
      const newPage = selectedAgentList?.length === totalRecords ? 1 : page;
      await getAgentsListData?.(newPage);
      closeAgentDeleteModal?.();
    } catch (error: any) {
      errorSnackbar?.();
      setSelectedAgentList?.([]);
      closeAgentDeleteModal?.();
    }
  };
  const closeAgentDeleteModal = () => {
    setOpenDeleteModal?.(false);
  };

  return {
    deleteAgent,
    closeAgentDeleteModal,
    deleteAgentStatus,
  };
};
