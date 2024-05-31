import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { buildQueryParams } from '@/utils/api';
import {
  actionButtonDropdownDynamic,
  loyaltyRolesAndRightColumnsDynamic,
} from './RolesAndRight.data';
import useAuth from '@/hooks/useAuth';
import { useLazyGetPermissionsRoleForLoyaltyQuery } from '@/services/airLoyaltyProgram/roles-and-right';
import { DeleteRoles } from './DeleteRoles';
import { useRouter } from 'next/router';
import { ARRAY_INDEX } from '@/constants/strings';

export const useRolesAndRight = () => {
  const [search, setSearch] = useState('');
  const [selectedRolesList, setSelectedRolesList] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();
  const auth: any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const [
    lazyGetPermissionsRoleForLoyaltyTrigger,
    lazyGetPermissionsRoleForLoyaltyStatus,
  ]: any = useLazyGetPermissionsRoleForLoyaltyQuery?.();

  const getLoyaltyRolesList = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search + ''],
      ['organizationCompanyAccountId', organizationCompanyAccountId + ''],
      ['organizationId', organizationId + ''],
      ['productId', productId],
    ];
    const rolesListParam: any = buildQueryParams(additionalParams);
    const apiDataParameter = {
      queryParams: rolesListParam,
    };
    try {
      await lazyGetPermissionsRoleForLoyaltyTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getLoyaltyRolesList?.();
  }, [page, search, pageLimit]);

  const loyaltyRolesAndRightColumns = loyaltyRolesAndRightColumnsDynamic?.(
    selectedRolesList,
    setSelectedRolesList,
    lazyGetPermissionsRoleForLoyaltyStatus?.data?.data?.usercompanyaccounts,
  );

  const renderPortalComponent = () => {
    if (isPortalOpen?.isDelete) {
      return (
        <DeleteRoles
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          selectedRolesList={selectedRolesList}
          setSelectedRolesList={setSelectedRolesList}
          getRolesListData={getLoyaltyRolesList}
          setPage={setPage}
          page={page}
          totalRecords={
            lazyGetPermissionsRoleForLoyaltyStatus?.data?.data
              ?.companyaccountroles?.length
          }
        />
      );
    }
    return <></>;
  };

  const actionButtonDropdown = actionButtonDropdownDynamic?.(
    setIsPortalOpen,
    selectedRolesList,
    router,
  );
  return {
    loyaltyRolesAndRightColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetPermissionsRoleForLoyaltyStatus,
    renderPortalComponent,
    isPortalOpen,
    actionButtonDropdown,
    selectedRolesList,
    router,
  };
};
