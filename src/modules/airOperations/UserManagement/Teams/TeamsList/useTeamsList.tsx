import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import {
  setIsPortalOpen,
  setPage,
  setPageIncrement,
  setPageLimit,
  setPageDecrement,
} from '@/redux/slices/airOperations/teams/slice';
import { operationsTeamsListColumnDynamic } from './TeamsList.data';
import { useGetTeamsLists } from '../../UserManagementHooks/useGetTeamsLists';

export const useTeamsList = () => {
  const {
    getOperationTeamList,
    lazyGetTeamListForOperationStatus,
    page,
    pageLimit,
    search,
  } = useGetTeamsLists?.();

  const dispatch = useAppDispatch();

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());
  const refetch = () => getOperationTeamList?.(page);

  useEffect(() => {
    getOperationTeamList?.();
  }, [page, search, pageLimit]);

  const setAction = (actionType: string, data?: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
        data,
      }),
    );
  };

  const operationsTeamsListColumn =
    operationsTeamsListColumnDynamic?.(setAction);

  const isApiCalled =
    !lazyGetTeamListForOperationStatus?.data &&
    !lazyGetTeamListForOperationStatus?.error;

  return {
    operationsTeamsListColumn,
    lazyGetTeamListForOperationStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  };
};
