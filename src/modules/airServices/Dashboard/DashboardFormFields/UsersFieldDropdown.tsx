import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetServicesDashboardUsersListDropdownForAccessQuery } from '@/services/airServices/dashboard';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

export const UsersFieldDropdown = (props: any) => {
  const { disabled } = props;
  const apiQueryUsers =
    useLazyGetServicesDashboardUsersListDropdownForAccessQuery?.();

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

  return (
    <RHFAutocompleteAsync
      name="specialUsers"
      label=""
      placeholder="Select users"
      fullWidth
      required
      apiQuery={apiQueryUsers}
      multiple
      disabled={disabled}
      size="small"
      externalParams={{ productId }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
