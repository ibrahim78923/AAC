import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetOperationsUserManagementPermissionsRolesDropdownQuery } from '@/services/airOperations/user-management/user';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const RoleFieldDropdown = (props: any) => {
  const { disabled = false } = props;
  const product = useMemo(() => getActiveAccountSession(), []);
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};
  const organizationCompanyAccountId = product?.company?._id ?? {};
  const roleApiQuery =
    useLazyGetOperationsUserManagementPermissionsRolesDropdownQuery?.();

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
