import { AntSwitch } from '@/components/AntSwitch';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { useUpdateRuleStatus } from './useUpdateRuleStatus';

const { ACTIVE } = PRODUCT_USER_STATUS ?? {};

export const UpdateRuleStatus = (props: any) => {
  const { currentStatus } = props;

  const { changeLoyaltyProgramRuleStatus, apiCallInProgress } =
    useUpdateRuleStatus(props);

  return (
    <AntSwitch
      checked={currentStatus === ACTIVE}
      onChange={changeLoyaltyProgramRuleStatus}
      isLoading={apiCallInProgress}
      disabled={apiCallInProgress}
    />
  );
};
