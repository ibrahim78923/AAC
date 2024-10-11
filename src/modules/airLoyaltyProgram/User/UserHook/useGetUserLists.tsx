import {
  emptySelectedUsersLists,
  setUsersListsTotalRecords,
} from '@/redux/slices/airLoyaltyProgram/users/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetLoyaltyProgramUserManagementProductUserListsQuery } from '@/services/airLoyaltyProgram/user';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const useGetUserLists = () => {
  const [
    lazyGetLoyaltyProgramUserManagementProductUserListsTrigger,
    lazyGetLoyaltyProgramUserManagementProductUserListsStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetLoyaltyProgramUserManagementProductUserListsQuery?.();

  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state?.loyaltyProgramUsers?.page);

  const pageLimit = useAppSelector(
    (state) => state?.loyaltyProgramUsers?.pageLimit,
  );

  const search = useAppSelector((state) => state?.loyaltyProgramUsers?.search);

  const getLoyaltyProgramUsersList = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search,
      },
    };
    try {
      const response =
        await lazyGetLoyaltyProgramUserManagementProductUserListsTrigger?.(
          apiDataParameter,
        )?.unwrap();
      dispatch(emptySelectedUsersLists());
      dispatch(
        setUsersListsTotalRecords(response?.data?.usercompanyaccounts?.length),
      );
    } catch (error: any) {}
  };

  return {
    getLoyaltyProgramUsersList,
    lazyGetLoyaltyProgramUserManagementProductUserListsStatus,
    page,
    pageLimit,
    search,
  };
};
