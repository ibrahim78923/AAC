import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetDashboardOwnersDropdownListForDashboardQuery } from '@/services/airServices/dashboard';

export const DashboardOwnersFieldDropdown = () => {
  const auth = useAuth();
  const { _id: productId }: any = auth?.product ?? {};

  const apiQueryOwner =
    useLazyGetDashboardOwnersDropdownListForDashboardQuery?.();

  return (
    <RHFAutocompleteAsync
      label="Owner"
      name="owner"
      placeholder="Select owner"
      fullWidth
      required
      apiQuery={apiQueryOwner}
      size="small"
      externalParams={{ productId }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
