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
import { loyaltyProgramRoleAndRightsSelectedRoleAndRightsListsSelector } from '@/redux/slices/airLoyaltyProgram/roles-and-right/selectors';

export const useRoleAndRightsList = () => {
  const {
    getLoyaltyProgramRoleAndRightsList,
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus,
    page,
    pageLimit,
    search,
  } = useGetRoleAndRightsList();

  const dispatch = useAppDispatch();

  const selectedRolesAndRightLists = useAppSelector(
    loyaltyProgramRoleAndRightsSelectedRoleAndRightsListsSelector,
  );

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedRolesAndRightList = (role: any) => {
    dispatch(setSelectedRoleAndRightsLists<any>(role));
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
      ?.companyaccountroles;

  const loyaltyRolesAndRightColumns = loyaltyRolesAndRightColumnsDynamic?.(
    selectedRolesAndRightLists,
    setSelectedRolesAndRightList,
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
