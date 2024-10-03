import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesDashboardDashboardOwnersDropdownListQuery } from '@/services/airServices/dashboard';

export const DashboardOwnersFieldDropdown = (props: any) => {
  const {
    name = 'owner',
    label = 'Owner',
    placeholder = 'Select owner',
    multiple = false,
    required = false,
    moreQueryParams = {},
  } = props;

  const auth: any = useAuth();
  const productId: any = auth?.product?._id ?? {};

  const apiQueryOwner =
    useLazyGetServicesDashboardDashboardOwnersDropdownListQuery?.();

  return (
    <RHFAutocompleteAsync
      name={name}
      label={label}
      placeholder={placeholder}
      fullWidth
      required={required}
      apiQuery={apiQueryOwner}
      multiple={multiple}
      size="small"
      externalParams={{ productId, ...moreQueryParams }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
