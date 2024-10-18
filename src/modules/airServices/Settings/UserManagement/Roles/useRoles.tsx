import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetPermissionsRoleQuery } from '@/services/airServices/settings/user-management/roles';
import { getActiveAccountSession } from '@/utils';
import { buildQueryParams } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function useRoles() {
  const router: any = useRouter();
  const [searchValue, setSearchValue] = useState<any>('');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const auth: any = useAuth();
  const activeAccount = useMemo(() => getActiveAccountSession(), []);

  const productId = auth?.product?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};
  const organizationCompanyAccountId = activeAccount?.company?._id ?? {};

  const [permissionsRoleTrigger, permissionsRoleStatus] =
    useLazyGetPermissionsRoleQuery();

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchValue(data);
  };

  const rolesListData = async (currentPage: any = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', searchValue + ''],
      ['organizationCompanyAccountId', organizationCompanyAccountId + ''],
      ['organizationId', organizationId + ''],
      ['productId', productId],
    ];
    const rolesListParam: any = buildQueryParams(additionalParams);

    const getRolesParameter = {
      queryParams: rolesListParam,
    };

    try {
      await permissionsRoleTrigger(getRolesParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    rolesListData?.();
  }, [page, pageLimit, searchValue]);

  return {
    router,
    handleSearch,
    permissionsRoleStatus,
    setPage,
    setPageLimit,
    rolesListData,
    page,
  };
}
