import { useState } from 'react';
import { PAGINATION } from '@/config';
import { userListApi } from '@/services/superAdmin/user-management/UserList';

const useAccounts = () => {
  const { useGetUsersAccountsQuery } = userListApi;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  return {
    useGetUsersAccountsQuery,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  };
};

export default useAccounts;
