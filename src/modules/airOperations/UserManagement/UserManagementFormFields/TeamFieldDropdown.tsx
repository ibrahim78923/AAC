import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetTeamDropdownForOperationUserListQuery } from '@/services/airOperations/user-management/user';

export const TeamFieldDropdown = (props: any) => {
  const { disabled = false } = props;
  const teamApiQuery = useLazyGetTeamDropdownForOperationUserListQuery?.();

  return (
    <RHFAutocompleteAsync
      name="team"
      label="Select team"
      placeholder="Select team"
      fullWidth
      required
      disabled={disabled}
      size="small"
      apiQuery={teamApiQuery}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
    />
  );
};
