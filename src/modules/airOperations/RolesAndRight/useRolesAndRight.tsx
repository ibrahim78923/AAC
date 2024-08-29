import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { buildQueryParams } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import { DeleteRoles } from './DeleteRoles';
import { useRouter } from 'next/router';
import { ARRAY_INDEX } from '@/constants/strings';
import {
  actionButtonDropdownDynamic,
  operationsRolesAndRightColumnsDynamic,
} from './RolesAndRight.data';
import { useLazyGetPermissionsRoleForOperationsQuery } from '@/services/airOperations/roles-and-right';
import {
  IAuth,
  IIsPortalOpen,
  ISelectedRolesList,
} from './RolesAndRight.interface';

export const useRolesAndRight = () => {
  const [search, setSearch] = useState('');
  const [selectedRolesList, setSelectedRolesList] =
    useState<ISelectedRolesList>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<IIsPortalOpen>({});
  const router = useRouter();
  const auth: IAuth | any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const [
    lazyGetPermissionsRoleForOperationsTrigger,
    lazyGetPermissionsRoleForOperationsStatus,
  ] = useLazyGetPermissionsRoleForOperationsQuery?.();

  const getOperationsRolesList = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search + ''],
      ['organizationCompanyAccountId', organizationCompanyAccountId + ''],
      ['organizationId', organizationId + ''],
      ['productId', productId],
    ];
    const rolesListParam: string | any = buildQueryParams(additionalParams);
    const apiDataParameter = {
      queryParams: rolesListParam,
    };
    try {
      await lazyGetPermissionsRoleForOperationsTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getOperationsRolesList?.();
  }, [page, search, pageLimit]);

  const operationsRolesAndRightColumns =
    operationsRolesAndRightColumnsDynamic?.(
      selectedRolesList,
      setSelectedRolesList,
      lazyGetPermissionsRoleForOperationsStatus?.data?.data
        ?.companyaccountroles,
    );

  const renderPortalComponent = () => {
    if (isPortalOpen?.isDelete) {
      return (
        <DeleteRoles
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          selectedRolesList={selectedRolesList}
          setSelectedRolesList={setSelectedRolesList}
          getRolesListData={getOperationsRolesList}
          setPage={setPage}
          page={page}
          totalRecords={
            lazyGetPermissionsRoleForOperationsStatus?.data?.data
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
    operationsRolesAndRightColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetPermissionsRoleForOperationsStatus,
    renderPortalComponent,
    isPortalOpen,
    actionButtonDropdown,
    selectedRolesList,
    router,
  };
};
