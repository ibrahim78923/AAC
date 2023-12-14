import { userListApi } from '@/services/superAdmin/user-management/UserList';
const useAccounts = () => {
  const { useGetUsersAccountsQuery } = userListApi;

  return {
    useGetUsersAccountsQuery,
  };
};

export default useAccounts;
