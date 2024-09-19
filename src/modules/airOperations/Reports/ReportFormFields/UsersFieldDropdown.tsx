import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetUserAccessListDropdownListForReportsAccessManagementQuery } from '@/services/airOperations/reports';

export const UsersFieldDropdown = () => {
  const apiQueryUsers =
    useLazyGetUserAccessListDropdownListForReportsAccessManagementQuery();

  return (
    <RHFAutocompleteAsync
      label=""
      name="specialUsers"
      fullWidth
      required
      apiQuery={apiQueryUsers}
      multiple
      size="small"
      placeholder="Select users"
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
