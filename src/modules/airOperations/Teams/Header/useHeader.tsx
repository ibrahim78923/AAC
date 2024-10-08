import { useAppDispatch, useAppSelector } from '@/redux/store';
import { PAGINATION } from '@/config';
import { OPERATIONS_TEAM_ACTIONS_CONSTANT } from '../Teams.data';
import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airOperations/teams/slice';

const { ADD_OPERATIONS_TEAM } = OPERATIONS_TEAM_ACTIONS_CONSTANT;

export const useHeader = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsTeam?.isPortalOpen,
  );

  const handleSetSearch = (newSearch: any) => {
    dispatch(
      setSearch<any>({
        searchTerm: newSearch,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  const setAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const openAddTeamPortal = () => setAction(ADD_OPERATIONS_TEAM);

  return {
    openAddTeamPortal,
    handleSetSearch,
    isPortalOpen,
  };
};
