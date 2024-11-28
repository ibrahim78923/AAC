import { useAppDispatch, useAppSelector } from '@/redux/store';
import { actionsDropdownForLoyaltyProgramUserDynamic } from './Header.data';
import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airLoyaltyProgram/users/slice';
import { PAGINATION } from '@/config';
import { LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT } from '../User.data';
import {
  loyaltyProgramUsersIsPortalOpenSelector,
  loyaltyProgramUsersSelectedUsersListsSelector,
} from '@/redux/slices/airLoyaltyProgram/users/selectors';

export const useHeader = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(loyaltyProgramUsersIsPortalOpenSelector);

  const selectedUsersLists = useAppSelector(
    loyaltyProgramUsersSelectedUsersListsSelector,
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

  const actionsDropdownForLoyaltyProgramUser =
    actionsDropdownForLoyaltyProgramUserDynamic?.(
      setAction,
      selectedUsersLists,
    );

  const openAddUserPortal = () =>
    setAction(
      LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_USERS,
    );

  return {
    actionsDropdownForLoyaltyProgramUser,
    openAddUserPortal,
    handleSetSearch,
    selectedUsersLists,
    isPortalOpen,
  };
};
