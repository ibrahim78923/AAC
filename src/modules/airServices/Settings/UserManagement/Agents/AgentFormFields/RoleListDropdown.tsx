import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetPermissionsRoleForUpsertAgentQuery } from '@/services/airServices/settings/user-management/agents';

export const RoleListDropdown = () => {
  const auth: any = useAuth();
  const roleApiQuery = useLazyGetPermissionsRoleForUpsertAgentQuery?.();
  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const roleApiQueryParams = {
    productId,
    organizationCompanyAccountId,
    organizationId,
    limit: 50,
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
    />
  );
};
