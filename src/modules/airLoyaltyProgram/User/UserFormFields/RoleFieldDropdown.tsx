import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetLoyaltyProgramUserManagementPermissionsRolesDropdownQuery } from '@/services/airLoyaltyProgram/user';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const RoleFieldDropdown = (props: any) => {
  const { disabled = false } = props;
  const activeAccount = useMemo(() => getActiveAccountSession(), []);
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};
  const organizationCompanyAccountId = activeAccount?.company?._id ?? {};
  const roleApiQuery =
    useLazyGetLoyaltyProgramUserManagementPermissionsRolesDropdownQuery?.();

  return (
    <RHFAutocompleteAsync
      name="role"
      label="Assign role"
      placeholder="Select role"
      fullWidth
      required
      disabled={disabled}
      size="small"
      apiQuery={roleApiQuery}
      externalParams={{
        productId,
        organizationId,
        organizationCompanyAccountId,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
    />
  );
};
