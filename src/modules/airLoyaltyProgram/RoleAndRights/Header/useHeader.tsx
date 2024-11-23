import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airLoyaltyProgram/roles-and-right/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { roleAndRightsActionDropdownDynamic } from './Header.data';
import { PAGINATION } from '@/config';
import { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT } from '../RolesAndRight.data';
import {
  loyaltyProgramRoleAndRightsIsPortalOpenSelector,
  loyaltyProgramRoleAndRightsSelectedRoleAndRightsListsSelector,
} from '@/redux/slices/airLoyaltyProgram/roles-and-right/selectors';

export const useHeader = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    loyaltyProgramRoleAndRightsIsPortalOpenSelector,
  );
  const selectedRoleAndRightsLists = useAppSelector(
    loyaltyProgramRoleAndRightsSelectedRoleAndRightsListsSelector,
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

  const roleAndRightsActionDropdown = roleAndRightsActionDropdownDynamic?.(
    setAction,
    selectedRoleAndRightsLists,
  );

  const openAddRoleAndRightsPortal = () =>
    setAction(
      LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_ROLE_AND_RIGHTS,
    );

  return {
    roleAndRightsActionDropdown,
    openAddRoleAndRightsPortal,
    handleSetSearch,
    selectedRoleAndRightsLists,
    isPortalOpen,
  };
};
