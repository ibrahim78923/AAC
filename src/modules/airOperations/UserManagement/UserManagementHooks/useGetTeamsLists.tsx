import { setTeamListsTotalRecords } from '@/redux/slices/airOperations/teams/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetTeamListForOperationQuery } from '@/services/airOperations/user-management/user';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const useGetTeamsLists = () => {
  const [
    lazyGetTeamListForOperationTrigger,
    lazyGetTeamListForOperationStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetTeamListForOperationQuery?.();

  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state?.operationsTeam?.page);

  const pageLimit = useAppSelector((state) => state?.operationsTeam?.pageLimit);

  const search = useAppSelector((state) => state?.operationsTeam?.search);

  const getOperationTeamList = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search: '',
      },
    };
    try {
      const response =
        await lazyGetTeamListForOperationTrigger?.(apiDataParameter)?.unwrap();
      dispatch(setTeamListsTotalRecords(response?.data?.userTeams?.length));
    } catch (error: any) {}
  };

  return {
    getOperationTeamList,
    lazyGetTeamListForOperationStatus,
    page,
    pageLimit,
    search,
  };
};
