import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { agentsListsColumnsFunction, agentActionsDropdown } from './Agent.data';
import { ACTIONS_TYPES, NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { useLazyGetAgentsQuery } from '@/services/airServices/settings/user-management/agents';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';

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
  const router = useRouter();

  const [lazyGetAgentsTrigger, lazyGetAgentsStatus]: any =
    useLazyGetAgentsQuery();

  const getAgentsListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', searchValue],
      ['role', ROLES?.ORG_AGENT],
    ];

    const getAgentsListParam: any = buildQueryParams(
      additionalParams,
      filterAgentData,
    );

    const getAgentsListParameter = {
      queryParams: getAgentsListParam,
    };

    try {
      await lazyGetAgentsTrigger(getAgentsListParameter)?.unwrap();
      setSelectedAgentList([]);
    } catch (error: any) {}
  };

  useEffect(() => {
    getAgentsListData();
  }, [searchValue, page, pageLimit, filterAgentData]);

  const handleOpenDrawer = () => {
    setAgentFilterDrawerOpen(true);
  };

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
    lazyGetAgentsStatus?.data?.data?.users,
    router,
  );

  const dropdownOptions = agentActionsDropdown(handleActionClick);

  return {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    setSearchValue,
    handleOpenDrawer,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    isAgentModalOpen,
    setEditAgentModalTitle,
    editAgentModalTitle,
    handleAddAgentModal,
    lazyGetAgentsStatus,
    setPageLimit,
    setPage,
    pageLimit,
    setSelectedAgentList,
    setFilterAgentData,
    openDeleteModal,
    setOpenDeleteModal,
    getAgentsListData,
    page,
  };
};
