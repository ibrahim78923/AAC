import { AntSwitch } from '@/components/AntSwitch';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { useUpdateUserStatus } from './useUpdateUserStatus';

const { ACTIVE } = PRODUCT_USER_STATUS ?? {};

export const UpdateUserStatus = (props: any) => {
  const { currentStatus } = props;

  const { changeOperationUserStatus, apiCallInProgress } =
    useUpdateUserStatus(props);

  return (
    <AntSwitch
      checked={currentStatus === ACTIVE}
      onChange={changeOperationUserStatus}
      isLoading={apiCallInProgress}
      disabled={apiCallInProgress}
    />
  );
};
