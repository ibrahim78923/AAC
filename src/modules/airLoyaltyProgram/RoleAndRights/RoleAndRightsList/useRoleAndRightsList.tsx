import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedRoleAndRightsLists,
} from '@/redux/slices/airLoyaltyProgram/roles-and-right/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useGetRoleAndRightsList } from '../RolesAndRightsHook/useGetRoleAndRightsList';
import { loyaltyRolesAndRightColumnsDynamic } from './RoleAndRights.data';

export const useRoleAndRightsList = () => {
  const {
    getLoyaltyProgramRoleAndRightsList,
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus,
    page,
    pageLimit,
    search,
  } = useGetRoleAndRightsList();

  const dispatch = useAppDispatch();

  const selectedUsersLists = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.selectedRoleAndRightsLists,
  );

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedUserList = (user: any) => {
    dispatch(setSelectedRoleAndRightsLists<any>(user));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());
  const refetch = () => getLoyaltyProgramRoleAndRightsList?.(page);

  useEffect(() => {
    getLoyaltyProgramRoleAndRightsList?.();
  }, [page, search, pageLimit]);

  const totalUsers =
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data?.data
      ?.usercompanyaccounts;

  const loyaltyRolesAndRightColumns = loyaltyRolesAndRightColumnsDynamic?.(
    selectedUsersLists,
    setSelectedUserList,
    totalUsers,
  );

  const isApiCalled =
    !lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data &&
    !lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.error;

  return {
    loyaltyRolesAndRightColumns,
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  };
};
