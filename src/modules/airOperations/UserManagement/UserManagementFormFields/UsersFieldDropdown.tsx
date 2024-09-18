import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetProductTeamUserListDropdownQuery } from '@/services/airOperations/user-management/user';

export const UsersFieldDropdown = () => {
  const apiQueryProductUsers = useLazyGetProductTeamUserListDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name="userAccounts"
      label="Select Team Members"
      placeholder="Select"
      fullWidth={true}
      multiple={true}
      apiQuery={apiQueryProductUsers}
      externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
      getOptionLabel={(option: any) =>
        `${option?.user?.firstName} ${option?.user?.lastName}`
      }
    />
  );
};
