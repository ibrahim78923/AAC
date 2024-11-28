import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { LOYALTY_PROGRAM_RULE_STATUS } from '@/constants/api';
import { useChangeLoyaltyProgramLoyaltySingleRuleStatusMutation } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import { useGetRulesLists } from '../RulesHooks/useGetRulesLists';

export const UpdateRuleStatus = (props: any) => {
  const { currentStatus, currentId } = props;
  const { getLoyaltyProgramRulesList } = useGetRulesLists?.();

  const changeStatusApiQuery =
    useChangeLoyaltyProgramLoyaltySingleRuleStatusMutation?.();

  return (
    <ActivityStatusMenu
      info={currentId}
      activityStatus={currentStatus}
      menuItemDataArray={[
        {
          value: LOYALTY_PROGRAM_RULE_STATUS?.ACTIVE,
          label: LOYALTY_PROGRAM_RULE_STATUS?.ACTIVE,
        },
        {
          value: LOYALTY_PROGRAM_RULE_STATUS?.IN_ACTIVE,
          label: LOYALTY_PROGRAM_RULE_STATUS?.IN_ACTIVE,
        },
      ]}
      apiQuery={changeStatusApiQuery}
      refetchApi={getLoyaltyProgramRulesList}
      hasPermission
    />
  );
};
