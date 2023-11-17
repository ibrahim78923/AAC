import { userListApi } from '@/services/superAdmin/user-management/UserList';

const useCompanyAccounts = () => {
  const { useGetUsersAccountsQuery }: any = userListApi;
  const { data } = useGetUsersAccountsQuery();

  return {
    data,
  };
};

export default useCompanyAccounts;
