import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetMarketingDashboardUserAccessListDropdownListForDashboardQuery } from '@/services/airMarketer/dasboard';

export const DashboardOwnersFieldDropdown = (props: any) => {
  const {
    name = 'owner',
    label = 'Owner',
    placeholder = 'Select owner',
    multiple = false,
    required = false,
    moreQueryParams = {},
  } = props;

  const auth = useAuth();
  const { _id: productId }: any = auth?.product ?? {};

  const apiQueryOwner =
    useLazyGetMarketingDashboardUserAccessListDropdownListForDashboardQuery?.();

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
