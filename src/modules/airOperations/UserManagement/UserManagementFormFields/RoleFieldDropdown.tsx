import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetPermissionsRoleForUpsertOperationUserQuery } from '@/services/airOperations/user-management/user';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const RoleFieldDropdown = () => {
  const product = useMemo(() => getActiveAccountSession(), []);
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};
  const companyId = product?.company?._id ?? {};
  const roleApiQuery = useLazyGetPermissionsRoleForUpsertOperationUserQuery?.();

  return (
    <RHFAutocompleteAsync
      name="role"
      label="Assign Role"
      placeholder="Select Role"
      fullWidth
      required
      apiQuery={roleApiQuery}
      externalParams={{
        productId,
        organizationId,
        companyId,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
    />
  );
};
