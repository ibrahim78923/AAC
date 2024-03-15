import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useGetPermissionsRoleQuery } from '@/services/airServices/settings/user-management/roles';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useRoles() {
  const router: any = useRouter();
  const [searchValue, setSearchValue] = useState<any>('');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[0]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const { data, isLoading, isFetching, isError } = useGetPermissionsRoleQuery({
    page,
    limit: pageLimit,
    search: searchValue,
    organizationCompanyAccountId,
    organizationId,
    productId,
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
