import { setIsPortalOpen } from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { setIsPortalOpen as setIsTiersPortalOpen } from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../RulesAndTiers.constant';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const isRulePortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramRules?.isPortalOpen,
  );

  const isTierPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramTiers?.isPortalOpen,
  );

  const setRuleAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const setTierAction = (actionType: any) => {
    dispatch(
      setIsTiersPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const openCreateRulePortal = () =>
    setRuleAction(RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.CREATE_RULES);

  const openCreateTiersPortal = () =>
    setTierAction(RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.CREATE_TIERS);

  return {
    isRulePortalOpen,
    isTierPortalOpen,
    openCreateRulePortal,
    openCreateTiersPortal,
  };
};
