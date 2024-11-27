import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { ACTIVITY_STATUS_MENU } from '@/constants';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import { useStatusLoyaltyProgramRewardsMutation } from '@/services/airLoyaltyProgram/loyalty/rewards';
import { capitalizeStatus, getActivePermissionsSession } from '@/utils';

const RewardStatus = ({ info, status }: any) => {
  const menuItemDataArray = [
    { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
    { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
  ];
  const activePermission = getActivePermissionsSession()?.includes(
    AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.ACTIVE_INACTIVE_REWARDS,
  );
  return (
    <div>
      <ActivityStatusMenu
        info={info}
        activityStatus={status}
        menuItemDataArray={menuItemDataArray}
        hasPermission={activePermission}
        apiQuery={useStatusLoyaltyProgramRewardsMutation?.()}
        patchParameterProps={(event: any) => ({
          params: { id: [info?.row?.original?._id] },
          body: { status: capitalizeStatus(event?.target?.value) },
        })}
      />
    </div>
  );
};

export default RewardStatus;
