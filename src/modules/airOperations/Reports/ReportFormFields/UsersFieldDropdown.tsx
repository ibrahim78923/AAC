import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetOperationsReportsUserListDropdownForAccessManagementQuery } from '@/services/airOperations/reports';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

export const UsersFieldDropdown = () => {
  const apiQueryUsers =
    useLazyGetOperationsReportsUserListDropdownForAccessManagementQuery();
  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);
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
      externalParams={{
        admin: true,
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
