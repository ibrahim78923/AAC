import { useEffect, useState } from 'react';
import { agentsListsColumnsFunction, agentActionsDropdown } from './Agent.data';
import { ROLES } from '@/constants/strings';
import { useLazyGetServicesUserAgentsQuery } from '@/services/airServices/settings/user-management/agents';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';

export const useAgent = () => {
  const [selectedAgentList, setSelectedAgentList] = useState([]);
  const [isAgentFilterDrawerOpen, setAgentFilterDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAgentModalOpen, setIsAgentModalOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterAgentData, setFilterAgentData] = useState({});
  const router = useRouter();

  const [lazyGetAgentsTrigger, lazyGetAgentsStatus]: any =
    useLazyGetServicesUserAgentsQuery();

  const getAgentsListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', searchValue],
      ['role', ROLES?.ORG_EMPLOYEE],
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
    } catch (error: any) {
      setSelectedAgentList([]);
    }
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchValue(data);
  };

  useEffect(() => {
    getAgentsListData();
  }, [searchValue, page, pageLimit, filterAgentData]);

  const agentListsColumns = agentsListsColumnsFunction(
    selectedAgentList,
    setSelectedAgentList,
    lazyGetAgentsStatus?.data?.data?.users,
    router,
  );

  const dropdownOptions = agentActionsDropdown(
    setOpenDeleteModal,
    setIsAgentModalOpen,
    selectedAgentList,
  );

  return {
    agentListsColumns,
    dropdownOptions,
    handleSearch,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    isAgentModalOpen,
    lazyGetAgentsStatus,
    setPageLimit,
    setPage,
    pageLimit,
    setFilterAgentData,
    selectedAgentList,
    setSelectedAgentList,
    getAgentsListData,
    page,
    openDeleteModal,
    setOpenDeleteModal,
    setIsAgentModalOpen,
    filterAgentData,
  };
};
