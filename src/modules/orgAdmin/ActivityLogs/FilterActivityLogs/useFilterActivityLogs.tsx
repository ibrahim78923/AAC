import {
  useLazyGetAllUsersDropdownQuery,
  useLazyGetCompanyAccountsListsQuery,
  useLazyGetOrganizationsListQuery,
} from '@/services/common-APIs';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import { getActiveProductSession, getSession } from '@/utils';

const useFilterActivityLogs = ({
  setFilterValues,
  setIsFilter,
  setPage,
}: any) => {
  const { user }: any = getSession();
  const { name: role } = getActiveProductSession();

  const onSubmit = async (values: any) => {
    setFilterValues({ ...values });

    setIsFilter(false);
    setPage(1);
  };

  const companyAccounts = useLazyGetCompanyAccountsListsQuery();

  const organizations = useLazyGetOrganizationsListQuery();

  const orgUsersData = useLazyGetOrganizationUsersQuery();

  const allOrganizationsUsers = useLazyGetAllUsersDropdownQuery();

  return {
    onSubmit,
    orgUsersData,
    companyAccounts,
    user,
    organizations,
    role,
    allOrganizationsUsers,
  };
};

export default useFilterActivityLogs;
