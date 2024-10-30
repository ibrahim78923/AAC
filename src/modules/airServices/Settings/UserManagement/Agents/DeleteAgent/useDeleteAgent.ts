import { useDeleteAgentMutation } from '@/services/airServices/settings/user-management/agents';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IAgentsProps } from '../Agents.interface';

export const useDeleteAgent = (props: IAgentsProps) => {
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
    const deleteArticlesParameter = {
      body: { ids: selectedAgentList?.map((agent: any) => agent?._id) },
    };
    try {
      await deleteAgentTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Agent deleted successfully');
      setSelectedAgentList?.([]);
      const newPage = selectedAgentList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      closeAgentDeleteModal?.();
      await getAgentsListData?.(newPage);
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
