import useAuth from '@/hooks/useAuth';
import {
  emptySelectedRoleAndRightsLists,
  setRoleAndRightsListsTotalRecords,
} from '@/redux/slices/airLoyaltyProgram/roles-and-right/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListQuery } from '@/services/airLoyaltyProgram/roles-and-right';
import { getActiveAccountSession } from '@/utils';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useMemo } from 'react';

export const useGetRoleAndRightsList = () => {
  const activeAccount = useMemo(() => getActiveAccountSession(), []);
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};
  const organizationCompanyAccountId = activeAccount?.company?._id ?? {};

  const [
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListTrigger,
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListQuery?.();

  const dispatch = useAppDispatch();

  const page = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.page,
  );

  const pageLimit = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.pageLimit,
  );

  const search = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.search,
  );

  const getLoyaltyProgramRoleAndRightsList = async (
    currentPage: number = page,
  ) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search,
        productId,
        organizationId,
        organizationCompanyAccountId,
      },
    };
    try {
      const response =
        await lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListTrigger?.(
          apiDataParameter,
        )?.unwrap();
      dispatch(emptySelectedRoleAndRightsLists());
      dispatch(
        setRoleAndRightsListsTotalRecords(
          response?.data?.usercompanyaccounts?.length,
        ),
      );
    } catch (error: any) {}
  };

  return {
    getLoyaltyProgramRoleAndRightsList,
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus,
    page,
    pageLimit,
    search,
  };
};
