import { PAGINATION } from '@/config';
import { useGetPermissionsRoleQuery } from '@/services/airServices/settings/user-management/roles';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useRoles() {
  const router: any = useRouter();
  const [searchValue, setSearchValue] = useState<any>('');

  const [page, setPage] = useState(PAGINATION?.PAGE_COUNT);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isFetching, isError } = useGetPermissionsRoleQuery({
    page: page,
    limit: pageLimit,
    search: searchValue,
  });

  return {
    router,
    setSearchValue,
    data,
    isLoading,
    isFetching,
    isError,
    setPage,
    setPageLimit,
  };
}
