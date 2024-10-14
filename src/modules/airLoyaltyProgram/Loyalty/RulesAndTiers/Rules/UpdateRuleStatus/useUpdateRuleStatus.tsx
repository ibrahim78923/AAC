import { LOYALTY_PROGRAM_RULE_STATUS } from '@/constants/api';
import { useChangeLoyaltyProgramLoyaltySingleRuleStatusMutation } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import { errorSnackbar } from '@/utils/api';

export const useUpdateRuleStatus = (props: any) => {
  const { currentId } = props;
  const [
    changeLoyaltyProgramLoyaltySingleRuleStatusTrigger,
    changeLoyaltyProgramLoyaltySingleRuleStatusStatus,
  ] = useChangeLoyaltyProgramLoyaltySingleRuleStatusMutation?.();

  const changeLoyaltyProgramRuleStatus = async (e: any) => {
    const body = {
      status: e?.target?.checked
        ? LOYALTY_PROGRAM_RULE_STATUS?.ACTIVE
        : LOYALTY_PROGRAM_RULE_STATUS?.IN_ACTIVE,
    };

    const apiDataParameter = {
      pathParams: {
        id: currentId,
      },
      body,
    };

    try {
      await changeLoyaltyProgramLoyaltySingleRuleStatusTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const apiCallInProgress =
    changeLoyaltyProgramLoyaltySingleRuleStatusStatus?.isLoading;

  return {
    changeLoyaltyProgramRuleStatus,
    apiCallInProgress,
  };
};
