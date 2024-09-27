import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';

export const AgentFieldDropdown = (props: any) => {
  const { required = false, label = 'Agent' } = props;
  const apiQueryAgent =
    useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery();

  return (
    <RHFAutocompleteAsync
      name="agent"
      label={label}
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
