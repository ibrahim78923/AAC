import { useState } from 'react';
import { PAGINATION } from '@/config';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { enqueueSnackbar } from 'notistack';
import { PRODUCT_USER_STATUS } from '@/constants/strings';

const useAccounts = () => {
  const { useGetUsersAccountsQuery } = userListApi;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { useUpdateAccountStatusMutation } = userListApi;
  const [updateAccountStatus] = useUpdateAccountStatusMutation();
  const [isLoadingStatus, setIsLoadingStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const handleStatusUpdate = async (id: any, value: any) => {
    setIsLoadingStatus((prevState) => ({ ...prevState, [id]: true }));
    const status = value
      ? PRODUCT_USER_STATUS?.ACTIVE
      : PRODUCT_USER_STATUS?.INACTIVE;
    const params = {
      status: status,
    };
    try {
      await updateAccountStatus({ id: id, body: params })?.unwrap();
      enqueueSnackbar('Account updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    } finally {
      setIsLoadingStatus((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  return {
    useGetUsersAccountsQuery,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handleStatusUpdate,
    isLoadingStatus,
  };
};

export default useAccounts;
