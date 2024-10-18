import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { useLazyGetRequesterDropdownQuery } from '@/services/airCustomerPortal/catalog';

const GetCatalogRequesterDropdown = (props: any) => {
  const { requestForSomeOne } = props;
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="requestor"
        label={requestForSomeOne ? 'Request For' : 'Requester'}
        fullWidth
        required
        size="small"
        apiQuery={apiQueryRequester}
        externalParams={{
          limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
          role: ROLES?.ORG_REQUESTER,
        }}
        getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
          `${option?.firstName} ${option?.lastName}`
        }
        placeholder="Add Requester"
      />
    </>
  );
};

export default GetCatalogRequesterDropdown;
