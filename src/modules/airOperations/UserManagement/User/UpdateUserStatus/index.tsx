import { AntSwitch } from '@/components/AntSwitch';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { useUpdateUserStatus } from './useUpdateUserStatus';

export const UpdateUserStatus = (props: any) => {
  const {
    currentStatus,
    currentId = '',
    loaderId = '',
    disabled = false,
  } = props;

  const { changeOperationUserStatus } = useUpdateUserStatus(props);

  return (
    <AntSwitch
      checked={currentStatus === PRODUCT_USER_STATUS?.ACTIVE}
      onChange={changeOperationUserStatus}
      isLoading={disabled && loaderId === currentId}
      disabled={disabled}
    />
  );
};
