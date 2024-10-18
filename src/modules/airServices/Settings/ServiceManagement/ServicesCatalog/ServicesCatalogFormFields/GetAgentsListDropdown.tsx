import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesSettingsServicesAgentsDropdownListQuery } from '@/services/airServices/settings/service-management/service-catalog';

export const GetAgentsListDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiQueryAgent =
    useLazyGetAirServicesSettingsServicesAgentsDropdownListQuery();
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};

  return (
    <RHFAutocompleteAsync
      name="agentVisibilty"
      label="Agent visibility"
      placeholder="Choose agent"
      fullWidth
      required
      size="small"
      multiple
      disabled={disabled}
      apiQuery={apiQueryAgent}
      externalParams={{
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
