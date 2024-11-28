import { AntSwitch } from '@/components/AntSwitch';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { useUpdateUserStatus } from './useUpdateUserStatus';

const { ACTIVE } = PRODUCT_USER_STATUS ?? {};

export const UpdateUserStatus = (props: any) => {
  const { currentStatus, canChangeUserStatus } = props;

  const { changeOperationUserStatus, changeSingleUserStatusStatus } =
    useUpdateUserStatus(props);

  return (
    <AntSwitch
      checked={currentStatus === ACTIVE}
      onChange={changeOperationUserStatus}
      isLoading={changeSingleUserStatusStatus?.isLoading}
      disabled={!canChangeUserStatus || changeSingleUserStatusStatus?.isLoading}
    />
  );
};
