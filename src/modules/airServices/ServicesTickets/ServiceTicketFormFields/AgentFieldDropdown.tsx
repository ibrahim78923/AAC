import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

export const AgentFieldDropdown = (props: any) => {
  const { required = false, label = 'Agent' } = props;
  const apiQueryAgent =
    useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery();

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

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
