import { useAppDispatch, useAppSelector } from '@/redux/store';
import { actionsDropdownForOperationUserDynamic } from './Header.data';
import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airOperations/users/slice';
import { PAGINATION } from '@/config';
import { OPERATIONS_USERS_ACTIONS_CONSTANT } from '../User.data';

export const useHeader = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsUsersLists?.isPortalOpen,
  );
  const selectedUsersLists = useAppSelector(
    (state) => state?.operationsUsersLists?.selectedUsersLists,
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
  const actionsDropdownForOperationUser =
    actionsDropdownForOperationUserDynamic?.(setAction, selectedUsersLists);

  const openAddUserPortal = () =>
    setAction(OPERATIONS_USERS_ACTIONS_CONSTANT?.ADD_OPERATIONS_USERS);

  return {
    actionsDropdownForOperationUser,
    openAddUserPortal,
    handleSetSearch,
    selectedUsersLists,
    isPortalOpen,
  };
};
