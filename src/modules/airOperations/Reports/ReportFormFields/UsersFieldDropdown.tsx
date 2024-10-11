import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetOperationsReportsUserListDropdownForAccessManagementQuery } from '@/services/airOperations/reports';

export const UsersFieldDropdown = () => {
  const apiQueryUsers =
    useLazyGetOperationsReportsUserListDropdownForAccessManagementQuery();

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
