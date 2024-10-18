import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesSettingsServicesSoftwareDropdownListQuery } from '@/services/airServices/settings/service-management/service-catalog';

export const GetSoftwareListDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiSoftwareQuery =
    useLazyGetAirServicesSettingsServicesSoftwareDropdownListQuery();

  return (
    <RHFAutocompleteAsync
      name="software"
      label="Select software"
      placeholder="Choose software"
      fullWidth
      size="small"
      required
      disabled={disabled}
      apiQuery={apiSoftwareQuery}
      externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
    />
  );
};
