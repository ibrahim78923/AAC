import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesContactOwnerQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { isNullOrEmpty } from '@/utils';

export const ContactOwnerDropdown = (props: any) => {
  const {
    getOptionLabel = (option: AutocompleteAsyncOptionsI) =>
      isNullOrEmpty(option?.firstName)
        ? `${option?.email}`
        : `${option?.firstName} ${option?.lastName}`,
    disabled = false,
  } = props;

  const apiQueryContactOwner = useLazyGetAirServicesContactOwnerQuery();

  return (
    <RHFAutocompleteAsync
      name={'ownerId'}
      label={'Contact Owner'}
      placeholder={'Select Owner'}
      required
      apiQuery={apiQueryContactOwner}
      size={'small'}
      getOptionLabel={getOptionLabel}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
      disabled={disabled}
    />
  );
};
