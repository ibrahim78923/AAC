import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';

export const AgentFieldDropdown = (props: any) => {
  const { required = false, label = 'Agent' } = props;
  const apiQueryAgent =
    useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

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
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
