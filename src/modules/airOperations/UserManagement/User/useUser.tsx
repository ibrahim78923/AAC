import { useTheme } from '@mui/material';
import { useState } from 'react';
import { userDropdown, userList } from './User.data';
import { useGetUserListQuery } from '@/services/airOperations/user-management/user';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';

export const useUser = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const param = {
    page: page,
    limit: pageLimit,
    role: ROLES?.ORG_ADMIN,
    search,
    // meta: true,
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetUserListQuery({ param });

  const userData = data?.data?.users;
  const userDropdownOptions = userDropdown(setDeleteModal);
  const userListColumn = userList(
    userData,
    selectedUserList,
    setSelectedUserList,
    setIsDrawerOpen,
  );
  return {
    userData,
    theme,
    selectedUserList,
    setSelectedUserList,
    userListColumn,
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    userDropdownOptions,
    deleteModal,
    setDeleteModal,
    setSearch,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPage,
    setPageLimit,
  };
};
