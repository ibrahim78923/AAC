import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { requestersList, requestersDropdown } from './Requesters.data';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { useLazyGetRequestersListQuery } from '@/services/airServices/settings/user-management/requesters';

export const useRequesters = () => {
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedRequestersList, setSelectedRequestersList] = useState<any>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isAgentConvert, setIsAgentConvert] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');

  const [lazyGetRequestersTrigger, lazyGetRequestersStatus]: any =
    useLazyGetRequestersListQuery();

  const getRequestersListData = async (currentPage = page) => {
    const queryParams = {
      page: currentPage,
      limit: pageLimit,
      search: search,
      role: ROLES?.ORG_REQUESTER,
    };

    const getRequestersListParameter = {
      queryParams,
    };

    try {
      await lazyGetRequestersTrigger(getRequestersListParameter)?.unwrap();
      setSelectedRequestersList([]);
    } catch (error) {
      setSelectedRequestersList([]);
    }
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  useEffect(() => {
    getRequestersListData();
  }, [search, page, pageLimit]);

  const requestersListColumn = requestersList(
    selectedRequestersList,
    setSelectedRequestersList,
    theme,
    router,
    lazyGetRequestersStatus?.data?.data?.users,
  );

  const requestersDropdownOptions = requestersDropdown(
    setDeleteModalOpen,
    setIsAgentConvert,
    selectedRequestersList,
  );

  return {
    theme,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedRequestersList,
    setSelectedRequestersList,
    deleteModalOpen,
    setDeleteModalOpen,
    isAgentConvert,
    setIsAgentConvert,
    requestersDropdownOptions,
    router,
    requestersListColumn,
    setPage,
    setPageLimit,
    lazyGetRequestersStatus,
    page,
    pageLimit,
    handleSearch,
    getRequestersListData,
  };
};
