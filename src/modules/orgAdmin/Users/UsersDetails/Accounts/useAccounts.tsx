import { useState } from 'react';
import { PAGINATION } from '@/config';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { enqueueSnackbar } from 'notistack';

const useAccounts = () => {
  const { useGetUsersAccountsQuery } = userListApi;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { useUpdateAccountStatusMutation } = userListApi;
  const [updateAccountStatus] = useUpdateAccountStatusMutation();

  const handleStatusUpdate = (id: any, value: any) => {
    const status = value === true ? 'ACTIVE' : 'INACTIVE';
    const params = {
      status: status,
    };
    try {
      updateAccountStatus({ id: id, body: params });
      enqueueSnackbar('Account updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
    }
  };

  return {
    useGetUsersAccountsQuery,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handleStatusUpdate,
  };
};

export default useAccounts;
