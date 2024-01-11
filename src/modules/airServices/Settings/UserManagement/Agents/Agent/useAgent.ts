import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { agentsListsColumnsFunction, agentActionsDropdown } from './Agent.data';
import { ACTIONS_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteAgentMutation,
  useGetAgentsQuery,
} from '@/services/airServices/settings/user-management/agents';
import { PAGINATION } from '@/config';

export const useAgent = () => {
  const [selectedAgentList, setSelectedAgentList] = useState([]);
  const [isAgentFilterDrawerOpen, setAgentFilterDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [editAgentModalTitle, setEditAgentModalTitle] = useState('Edit');
  const [isAgentModalOpen, setIsAgentModalOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterAgentData, setFilterAgentData] = useState({});

  const params = {
    page: page,
    limit: pageLimit,
    role: 'ORG_AGENT',
    search: searchValue,
    ...filterAgentData,
  };

  const { data, isLoading, isSuccess, isFetching } = useGetAgentsQuery(params);
  const agentListData = data?.data?.users;

  const metaData = data?.data?.meta;
  const processedAgentListData = agentListData?.map(
    (agent: { firstName: any; lastName: any }) => ({
      ...agent,
      fullName: `${agent.firstName} ${agent.lastName}`,
    }),
  );

  const handleOpenDrawer = () => {
    setAgentFilterDrawerOpen(true);
  };

  const [deleteAgent] = useDeleteAgentMutation();

  const handleActionClick = async (ActionType: string) => {
    if (ActionType === ACTIONS_TYPES?.DELETE) {
      setOpenDeleteModal(true);
    } else {
      if (selectedAgentList?.length > 1) {
        enqueueSnackbar(`Can't update multiple records`, {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
        return;
      }
      setEditAgentModalTitle('Update Agent');
      setIsAgentModalOpen(true);
    }
  };

  const handleAddAgentModal = (isOpen?: boolean) => {
    if (isOpen) {
      setEditAgentModalTitle('Invite Agent');
      return setIsAgentModalOpen(true);
    }
    setIsAgentModalOpen(false);
  };

  const agentListsColumns = agentsListsColumnsFunction(
    selectedAgentList,
    setSelectedAgentList,
    processedAgentListData,
  );

  const handleDelete = async () => {
    setOpenDeleteModal(false);
    try {
      const agentIdsToDelete = selectedAgentList?.map(
        (agent: any) => agent?._id,
      );
      const res: any = await deleteAgent({ ids: agentIdsToDelete });
      enqueueSnackbar(res?.message ?? 'Record deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedAgentList([]);
    } catch (err: any) {
      enqueueSnackbar(err?.message ?? `Can't update multiple records`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const deleteAgentProps = {
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
  };

  const dropdownOptions = agentActionsDropdown(handleActionClick);

  return {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    handleActionClick,
    setSearchValue,
    searchValue,
    deleteAgentProps,
    handleOpenDrawer,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    setIsAgentModalOpen,
    isAgentModalOpen,
    setEditAgentModalTitle,
    editAgentModalTitle,
    handleAddAgentModal,
    setSelectedAgentList,
    processedAgentListData,
    isFetching,
    isSuccess,
    isLoading,
    setPageLimit,
    setPage,
    pageLimit,
    metaData,
    setFilterAgentData,
  };
};
