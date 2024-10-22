import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesSettingsWorkloadAgentDropdownQuery } from '@/services/airServices/settings/agent-performance-management/workload-management/workload-schedule';

export const AgentsDropdown = () => {
  const apiQueryAgent =
    useLazyGetAirServicesSettingsWorkloadAgentDropdownQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name={'agentsId'}
      label={'Add Users'}
      placeholder="Choose Agent"
      size={'small'}
      multiple
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
