import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesAssociationStatusQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export const ContactsStatusDropdown = (props: any) => {
  const { disabled = false } = props;

  const apiQueryStatus = useLazyGetAirServicesAssociationStatusQuery();

  return (
    <RHFAutocompleteAsync
      name={'statusId'}
      label={'Status'}
      placeholder={'Select Status'}
      apiQuery={apiQueryStatus}
      size={'small'}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        status: 'active',
      }}
      disabled={disabled}
    />
  );
};
