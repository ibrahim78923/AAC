import {
  emptySelectedUsersLists,
  setUsersListsTotalRecords,
} from '@/redux/slices/airOperations/users/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetOperationsUserManagementProductUserListsQuery } from '@/services/airOperations/user-management/user';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const useGetUserLists = () => {
  const [
    lazyGetProductUserListForOperationTrigger,
    lazyGetProductUserListForOperationStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetOperationsUserManagementProductUserListsQuery?.();

  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state?.operationsUsersLists?.page);

  const pageLimit = useAppSelector(
    (state) => state?.operationsUsersLists?.pageLimit,
  );

  const search = useAppSelector((state) => state?.operationsUsersLists?.search);

  const getOperationUsersList = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search,
      },
    };
    try {
      const response =
        await lazyGetProductUserListForOperationTrigger?.(
          apiDataParameter,
        )?.unwrap();
      dispatch(emptySelectedUsersLists());
      dispatch(
        setUsersListsTotalRecords(response?.data?.usercompanyaccounts?.length),
      );
    } catch (error: any) {}
  };

  return {
    getOperationUsersList,
    lazyGetProductUserListForOperationStatus,
    page,
    pageLimit,
    search,
  };
};
