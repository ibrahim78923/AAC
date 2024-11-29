import { PAGINATION } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { useGetRulesLists } from '../RulesHooks/useGetRulesLists';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteLoyaltyProgramLoyaltySingleRuleMutation } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  loyaltyProgramRulesIsPortalOpenSelector,
  loyaltyProgramRulesTotalRecordsSelector,
} from '@/redux/slices/airLoyaltyProgram/rules/selectors';

export const useDeleteRules = () => {
  const [
    deleteLoyaltyProgramLoyaltySingleRuleTrigger,
    deleteLoyaltyProgramLoyaltySingleRuleStatus,
  ] = useDeleteLoyaltyProgramLoyaltySingleRuleMutation();

  const { getLoyaltyProgramRulesList, page } = useGetRulesLists?.();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(loyaltyProgramRulesIsPortalOpenSelector);

  const totalRecords = useAppSelector(loyaltyProgramRulesTotalRecordsSelector);

  const refetchApi = async () => {
    const newPage =
      totalRecords === SELECTED_ARRAY_LENGTH?.ONE
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getLoyaltyProgramRulesList?.();
  };

  const deleteRule = async () => {
    const apiDataParameter = {
      queryParams: {
        id: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteLoyaltyProgramLoyaltySingleRuleTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar?.('Rule deleted successfully!');
      closePortal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePortal = () => {
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress =
    deleteLoyaltyProgramLoyaltySingleRuleStatus?.isLoading;

  return {
    deleteRule,
    closePortal,
    apiCallInProgress,
    isPortalOpen,
  };
};
