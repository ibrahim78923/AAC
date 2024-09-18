import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetTeamDropdownForOperationUserListQuery } from '@/services/airOperations/user-management/user';

export const RoleFieldDropdown = () => {
  const teamApiQuery = useLazyGetTeamDropdownForOperationUserListQuery?.();

  return (
    <RHFAutocompleteAsync
      name="team"
      label="Select team"
      placeholder="Select team"
      fullWidth
      required
      apiQuery={teamApiQuery}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
    />
  );
};
