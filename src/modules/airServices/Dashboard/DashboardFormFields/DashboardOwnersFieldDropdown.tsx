import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetServicesDashboardDashboardOwnersDropdownListQuery } from '@/services/airServices/dashboard';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

export const DashboardOwnersFieldDropdown = (props: any) => {
  const {
    name = 'owner',
    label = 'Owner',
    placeholder = 'Select owner',
    multiple = false,
    required = false,
    moreQueryParams = {},
  } = props;

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

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
