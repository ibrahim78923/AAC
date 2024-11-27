import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { ACTIVITY_STATUS_MENU } from '@/constants';
import { usePutLoyaltyProgramConsumersStatusMutation } from '@/services/airLoyaltyProgram/consumers';

export default function ListStatusAction(props: any) {
  const { info, status } = props;

  return (
    <ActivityStatusMenu
      info={info}
      activityStatus={status}
      menuItemDataArray={[
        { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
        { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
      ]}
      hasPermission
      apiQuery={usePutLoyaltyProgramConsumersStatusMutation?.()}
      patchParameterProps={(event: any) => ({
        status: event?.target?.value,
        ids: [info?.row?.original?._id],
      })}
    />
  );
}
