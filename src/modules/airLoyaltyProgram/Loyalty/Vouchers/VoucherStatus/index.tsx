import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { LOYALTY_VOUCHER_STATUS } from '@/constants/loyalty-program';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import { usePatchVoucherMutation } from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { getActivePermissionsSession } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/api';

const tableStatusArray = [
  {
    label: LOYALTY_VOUCHER_STATUS?.ACTIVE_LABEL,
    value: LOYALTY_VOUCHER_STATUS?.ACTIVE_VALUE,
  },
  {
    label: LOYALTY_VOUCHER_STATUS?.INACTIVE_LABEL,
    value: LOYALTY_VOUCHER_STATUS?.INACTIVE_VALUE,
  },
];
export const VoucherStatus = ({ info }: any) => {
  const patchVouchersTrigger = usePatchVoucherMutation();
  const checkStatusPermissions = getActivePermissionsSession()?.includes(
    AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.ACTIVE_INACTIVE,
  );
  const patchParameterProps = (event: any) => ({
    queryParams: { id: info?.row?.original?._id },
    body: {
      status: capitalizeFirstLetter(event?.target?.value),
    },
  });
  return (
    <ActivityStatusMenu
      info={info}
      menuItemDataArray={tableStatusArray}
      activityStatus={info?.getValue()?.toUpperCase()}
      hasPermission={checkStatusPermissions}
      apiQuery={patchVouchersTrigger}
      patchParameterProps={patchParameterProps}
    />
  );
};
