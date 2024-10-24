import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesSettingsServicesRequestersDropdownListQuery } from '@/services/airServices/settings/service-management/service-catalog';

export const GetRequestersListDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiQueryRequester =
    useLazyGetAirServicesSettingsServicesRequestersDropdownListQuery();
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};

  return (
    <RHFAutocompleteAsync
      name="requesterVisibilty"
      label="Requester visibility"
      placeholder="Choose requester"
      fullWidth
      required
      size="small"
      multiple
      disabled={disabled}
      apiQuery={apiQueryRequester}
      externalParams={{
        requester: true,
        admin: true,
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
