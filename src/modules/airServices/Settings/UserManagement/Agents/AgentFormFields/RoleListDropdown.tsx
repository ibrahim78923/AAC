import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetPermissionsRoleForUpsertAgentQuery } from '@/services/airServices/settings/user-management/agents';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const RoleListDropdown = (props: any) => {
  const { required = false } = props;
  const roleApiQuery = useLazyGetPermissionsRoleForUpsertAgentQuery?.();

  const product = useMemo(() => getActiveAccountSession(), []);
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};
  const organizationCompanyAccountId = product?.company?._id ?? {};

  const roleApiQueryParams = {
    productId,
    organizationCompanyAccountId,
    organizationId,
    limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
  };

  return (
    <RHFAutocompleteAsync
      size="small"
      name="permissionsRole"
      label="Role"
      placeholder="Select Role"
      fullWidth={true}
      apiQuery={roleApiQuery}
      externalParams={roleApiQueryParams}
      required={required}
    />
  );
};
