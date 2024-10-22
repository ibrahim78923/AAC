import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesContactOwnerUsersDropdownQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export const ContactOwnerContactDropdown = (props: any) => {
  const { disabled = false } = props;
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const apiQueryContactOwner =
    useLazyGetAirServicesContactOwnerUsersDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={'contactOwnerId'}
      label={'Contact Owner'}
      placeholder={'Select Owner'}
      required
      apiQuery={apiQueryContactOwner}
      size={'small'}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        orgId,
      }}
      disabled={disabled}
    />
  );
};
