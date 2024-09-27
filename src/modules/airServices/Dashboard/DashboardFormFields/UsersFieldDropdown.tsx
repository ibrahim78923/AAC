import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetServicesDashboardUsersListDropdownForAccessQuery } from '@/services/airServices/dashboard';

export const UsersFieldDropdown = () => {
  const apiQueryUsers =
    useLazyGetServicesDashboardUsersListDropdownForAccessQuery?.();

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
