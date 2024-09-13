import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetAirServicesAllAgentsUsersDropdownListQuery } from '@/services/airServices/tickets';

export const AgentFieldDropdown = (props: any) => {
  const { required = false } = props;
  const apiQueryAgent = useLazyGetAirServicesAllAgentsUsersDropdownListQuery();

  return (
    <RHFAutocompleteAsync
      name="agent"
      label="Agent"
      placeholder="Choose Agent"
      fullWidth
      size="small"
      required={required}
      apiQuery={apiQueryAgent}
      externalParams={{
        admin: true,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
