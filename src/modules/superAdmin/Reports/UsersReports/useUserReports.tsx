import { PAGINATION } from '@/config';
import { EQuickLinksType } from '@/constants';
import { useGetReportsGraphQuery } from '@/services/superAdmin/reports';
import { useGetUsersQuery } from '@/services/superAdmin/user-management/users';
import { useState } from 'react';

const useUserReports = () => {
  const { data: usersReportsGraphData, isLoading } = useGetReportsGraphQuery(
    {},
  );
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchBy, setSearchBy] = useState<any>('');

  const params = {
    page: page,
    limit: pageLimit,
    role: EQuickLinksType?.ORG_ADMIN,
    search: searchBy ? searchBy : undefined,
  };
  const {
    data: companyOwnerUsersData,
    isLoading: usersLoading,
    isFetching,
    isSuccess,
  } = useGetUsersQuery(params);

  return {
    searchBy,
    setSearchBy,
    usersReportsGraphData,
    isLoading,
    companyOwnerUsersData,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    usersLoading,
    isFetching,
    isSuccess,
  };
};

export default useUserReports;
