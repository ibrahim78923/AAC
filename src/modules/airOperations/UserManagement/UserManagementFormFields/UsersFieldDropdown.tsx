import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetProductTeamUserListDropdownQuery } from '@/services/airOperations/user-management/user';

export const UsersFieldDropdown = () => {
  const apiQueryProductUsers = useLazyGetProductTeamUserListDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name="userAccounts"
      label="Select team members"
      placeholder="Select team members"
      fullWidth
      multiple
      size="small"
      apiQuery={apiQueryProductUsers}
      externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
      getOptionLabel={(option: any) =>
        `${option?.user?.firstName} ${option?.user?.lastName}`
      }
    />
  );
};
