import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesDashboardUsersListDropdownForAccessQuery } from '@/services/airServices/dashboard';

export const UsersFieldDropdown = () => {
  const apiQueryUsers =
    useLazyGetServicesDashboardUsersListDropdownForAccessQuery?.();

  const auth: any = useAuth();
  const productId: any = auth?.product?._id ?? {};

  return (
    <RHFAutocompleteAsync
      name="specialUsers"
      label=""
      placeholder="Select users"
      fullWidth
      required
      apiQuery={apiQueryUsers}
      multiple
      size="small"
      externalParams={{ productId }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
